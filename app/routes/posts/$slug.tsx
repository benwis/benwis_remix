import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";
import type { Post } from "~/models/post.server";
import { getPost, processMarkdownToHtml, matter } from "~/models/post.server";
import hljs from 'highlight.js';
import rust from 'highlight.js/lib/languages/rust';
import codeStyles from 'highlight.js/styles/github.css';
import { markdownToHtml } from "~/models/markdown.server";
import { isMe } from "~/session.server";

export function links() {
    return [
      {
        rel: "stylesheet",
        href: codeStyles,
      },
    ];
  }

type LoaderData = { post: Post; html: string, admin: boolean };

export const loader: LoaderFunction = async ({
    params, request
  }) => {
    invariant(params.slug, `params.slug is required`);
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    const admin = await isMe(request);

    //Extract front matter from md
    const {content, data} = matter(post.markdown);
    // Set options
// `highlight` example uses https://highlightjs.org
// hljs.registerLanguage('rust', rust);

// marked.setOptions({
//     renderer: new marked.Renderer(),
//     highlight: function(code, lang) {
//       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
//       return hljs.highlight(code, { language }).value;
//     },
//     langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
//     // pedantic: false,
//     // gfm: true,
//   });

    // console.log("marked,femark-napi, femark-ts, remark, femark");

    // const markedStart = performance.now();
    // marked.parse(content);
    // const markedEnd = performance.now();

    // const femarkStart = performance.now();
    // const html = renderMarkdown(content);
    // const femarkEnd = performance.now();

    const femarkTSStart = performance.now();
    const femarkTsHtml = processMarkdownToHtml(content);
    const femarkTSEnd = performance.now();

    // const remarkStart = performance.now();
    // await markdownToHtml(content);
    // const remarkEnd = performance.now();

    // const femark2Start = performance.now();
    // render_markdown(content);
    // const femark2End = performance.now();

    // console.log(`${markedEnd - markedStart}, ${femarkEnd - femarkStart},${femarkTSEnd - femarkTSStart},${remarkEnd - remarkStart},${femark2End - femark2Start}`)
    
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