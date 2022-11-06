import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, processMarkdownToHtml, matter } from "~/models/post.server";
import { isMe } from "~/session.server";

type LoaderData = { post: Post; html: string, toc: string | undefined, admin: boolean };

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    invariant(params.slug, `params.slug is required`);
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    // Redirect if post is not published or previewed
    if (!post.published && !post.preview){
      return redirect("/posts")
    }

    //Extract front matter from md
    const {content} = matter(post.markdown);
    const {content: html_content, toc} = processMarkdownToHtml(content); 

    return json<LoaderData>({ admin: await isMe(request), post, html: html_content, toc });
};

export const meta: MetaFunction = ({data, location}: {data: LoaderData, location: any}) => {
	if (!data || !data.post) {
		return {};
	}

	return {
		'og:title': data.post.title,
		'og:description': data.post.excerpt,
		'og:image': `https://benwis.imgix.net/ben_catcarbon.jpeg`,
    "twitter:site": "@iambenwis",
    "og:site_name": "benw.is",
    "og:locale": "en-us",
    "og:type": "article",
    "og:url": `https://benw.is${location.pathname}`,
    "twitter:title": data.post.title,
    "title": data.post.title,
    "twitter:card": "summary",
    "twitter:image": "https://benwis.imgix.net/ben_catcarbon.jpeg",
    "twitter:description": data.post.excerpt,
    "description": data.post.excerpt,
	}
}
  
  export default function PostSlug() {
    const { admin, post, html, toc } = useLoaderData<LoaderData>();
    let postDate = new Date(post.createdAt).toDateString();
    return (post.published || post.preview) ? (
      <main className="px-4 max-w-5xl">
        <div className="">

        <div className="flex justify-between w-full">
            <Link to="/posts" className="dark:text-white">Back to Posts</Link>
            {admin ? <div className="dark:text-white">
            <Link className="dark:text-white no-underline" to={`/posts/admin/${post.slug}`}> Edit</Link>
        </div> : null}
        </div>
        <h1 className="mb-4 text-3xl text-black dark:text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="dark:text-white text-black mb-2">
            {postDate}
        </div>
        <div
		className="-mx-4 my-2 flex h-1 w-[100vw] bg-gradient-to-r from-yellow-400 via-rose-400 to-cyan-500 sm:mx-0 sm:w-full"
	/>
   {toc ? <section className="dark:bg-gray-800 p-4 mt-4 table-of-contents-parent">
            <h2 className="text-xl text-black dark:text-white md:text-2xl">Contents</h2>
            <div className="text-black prose lg:prose-xl dark:prose-invert dark:text-white text-base md: w-full" dangerouslySetInnerHTML={{ __html: toc }} />   
          </section>: null}
          

        <div className="text-black prose lg:prose-xl dark:prose-invert dark:text-white text-base mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    ): null;
  }