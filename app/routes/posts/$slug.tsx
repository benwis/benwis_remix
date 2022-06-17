import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";
import type { Post } from "~/models/post.server";
import { getPost, renderMarkdown } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({
    params,
  }) => {
    invariant(params.slug, `params.slug is required`);
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    // const html = marked(post.markdown);
    const html = renderMarkdown(post.markdown);
    return json<LoaderData>({ post, html });
};
  
  export default function PostSlug() {
    const { post, html } = useLoaderData<LoaderData>();
    return (
      <main className="mx-auto max-w-4xl">
        <h1 className="my-6 text-center text-3xl dark:text-white">
          {post.title}
        </h1>
        <div className="prose dark:text-white text-center" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
  }