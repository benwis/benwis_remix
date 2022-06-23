import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, processMarkdownToHtml, matter } from "~/models/post.server";
import { generateImage } from "~/utils/seo";


// A resource route that generates an og:image for content
export const loader: LoaderFunction = async ({params, request}) => {


    invariant(params.slug, `params.slug is required`);
    let post= await getPost(params.slug);
    invariant(post, `post is required`);

// return generateImage(post);
};