import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";
import type { Post } from "~/models/post.server";
import { getPost, renderMarkdown, render_markdown } from "~/models/post.server";
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

    // Set options
// `highlight` example uses https://highlightjs.org
hljs.registerLanguage('rust', rust);

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
  });

    const markedStart = performance.now();
    const markedHtml = marked.parse(post.markdown);
    const markedEnd = performance.now();
    console.log(`Marked Time: ${markedEnd - markedStart}ms`);

    const femarkStart = performance.now();
    const html = renderMarkdown(post.markdown);
    const femarkEnd = performance.now();
    console.log(`Femark-napi Time: ${femarkEnd - femarkStart}ms`);

    const remarkStart = performance.now();
    const remarkHtml = await markdownToHtml(post.markdown);
    const remarkEnd = performance.now();
    console.log(`Remark Time: ${remarkEnd - remarkStart}ms`);

    const femark2Start = performance.now();
    const femark2html = render_markdown(post.markdown);
    const femark2End = performance.now();
    console.log(`Femark Time: ${femark2End - femark2Start}ms`);
    return json<LoaderData>({ admin, post, html: html });
};
  
  export default function PostSlug() {
    const { admin, post, html } = useLoaderData<LoaderData>();
    let postDate = new Date(post.createdAt);
    let parsedDate = `${postDate.getFullYear()}-${postDate.getMonth()}-${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`;
    return (
      <main className="mx-auto max-w-prose min-w-prose px-6">
        <div className="w-full">

        <div className="flex justify-between w-full">
            <Link to="/posts" className="dark:text-white">Back to Posts</Link>
            {admin ? <div className="dark:text-white">
            <Link className="dark:text-white no-underline" to={`/posts/admin/${post.slug}`}> Edit</Link>
        </div> : null}
        </div>
        
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="dark:text-white mb-2 border-b-2 pb-2">
            {parsedDate}
        </div>
        <div className="prose lg:prose-xl dark:prose-invert dark:text-white w-full" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    );
  }