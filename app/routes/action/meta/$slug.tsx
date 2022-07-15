import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, processMarkdownToHtml, matter } from "~/models/post.server";
import { render } from "~/utils/seo";


// A resource route that generates an og:image for content
export const loader: LoaderFunction = async ({params, request}) => {

    invariant(params.slug, `params.slug is required`);
    let post= await getPost(params.slug);
    invariant(post, `post is required`);

    // let output = await render(800,500, post);
    // console.log(`OUTPUT: ${output}`);

    
    return "Hi";


};

export default function Meta() {
    return <div>Meta</div>;

}