import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, processMarkdownToHtml, matter } from "~/models/post.server";
import { isMe } from "~/session.server";

type LoaderData = { post: Post; html: string, admin: boolean };

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    invariant(params.slug, `params.slug is required`);
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    const admin = await isMe(request);

    //Extract front matter from md
    const {content} = matter(post.markdown);
    const femarkTsHtml = processMarkdownToHtml(content); 

    return json<LoaderData>({ admin, post, html: femarkTsHtml });
};
  
  export default function PostSlug() {
    const { admin, post, html } = useLoaderData<LoaderData>();
    let postDate = new Date(post.createdAt).toDateString();
    return (
      <main className="mx-auto max-w-prose min-w-prose px-6">
        <div className="w-full">

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
        <div className="text-black prose lg:prose-xl dark:prose-invert dark:text-white text-base w-full mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    );
  }