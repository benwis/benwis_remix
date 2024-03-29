import type { LoaderFunction } from "@remix-run/node";
import { getUser } from "~/session.server";
import { Form, useActionData, useTransition, useLoaderData } from "@remix-run/react";
import { updatePost, deletePost, getPost } from "~/models/post.server";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import type { Post } from "~/models/post.server";

import invariant from "tiny-invariant";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({
    params, request
  }) => {
   let user = await getUser(request);
   // If the user is not me and not logged in, redirect to the login page
   if (!user || user.email !=="ben@benw.is"){
    return redirect("/login")
   }

    invariant(params.slug, `params.slug is required`);
    const post = await getPost(params.slug);
    invariant(post, `Post not found: ${params.slug}`);

    return json<LoaderData>({ post });
};

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      excerpt: null | string;
      markdown: null | string;
      hero: null | string;
      published: null | string;
      preview : null | string;
    }
  | undefined;

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const excerpt = formData.get("excerpt");
  const markdown = formData.get("markdown");
  const hero = formData.get("hero");
  let published = formData.get("published");
  let preview = formData.get("preview");

  const deleteButton = formData.get("deleteButton");

  if (deleteButton == "delete"){
    invariant(
        typeof slug === "string",
        "slug must be a string"
      );
    await deletePost(slug)
    return redirect("/posts/admin")
}
  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    excerpt: excerpt ? null : "Excerpt is required",
    markdown: markdown ? null : "Markdown is required",
    hero: hero? null : "Hero is required",
    published: published ? null : "Published is required",
    preview: preview ? null : "Preview is required",
  };

  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(
    typeof title === "string",
    "title must be a string"
  );
  invariant(
    typeof slug === "string",
    "slug must be a string"
  );
  invariant(
    typeof excerpt === "string",
    "excerpt must be a string"
  );
  invariant(
    typeof markdown === "string",
    "markdown must be a string"
  );
  invariant(
    typeof hero === "string",
    "hero must be a string"
  );
  invariant(
    typeof published === "string",
    "published must be a string"
  );
  invariant(
    typeof preview === "string",
    "preview must be a string"
  );
  published = JSON.parse(published.toLowerCase()) || false;
  preview = JSON.parse(preview.toLowerCase()) || false;
  invariant(
    typeof published == "boolean", "published must be a boolean"
  )
  invariant(
    typeof preview == "boolean", "preview must be a boolean"
  )
  await updatePost({ title, slug, excerpt, markdown, hero, published, preview });

  return redirect(`/posts/admin/${slug}`);
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg text-black bg-white`;

export default function AdminPost() {
    const { post } = useLoaderData<LoaderData>();
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);
  return (
    <Form method="post" key ={post.slug} className="text-black dark:text-white">
    <p>
      <label>
        Post Title:{" "}
        {errors?.title ? (
          <em className="text-red-600">{errors.title}</em>
        ) : null}
        <input
          type="text"
          name="title"
          className={inputClassName}
          defaultValue={post.title}

        />
      </label>
    </p>
    <p>
      <label>
        Post Slug:{" "}
        {errors?.slug ? (
          <em className="text-red-600">{errors.slug}</em>
        ) : null}
        <input
          type="text"
          name="slug"
          className={inputClassName}
          defaultValue={post.slug}
        />
      </label>
    </p>
    <p>
      <label>
        Hero:{" "}
        {errors?.hero ? (
          <em className="text-red-600">{errors.hero}</em>
        ) : null}
        <input
          type="text"
          name="hero"
          className={inputClassName}
          defaultValue={post.hero || ""}
        />
      </label>
    </p>
    <p>
      <label>
        Published:{" "}
        {errors?.published ? (
          <em className="text-red-600">{errors.published}</em>
        ) : null}
        <select
          name="published"
          className={inputClassName}
          defaultValue={post.published?.toString() || "false"}
        >
          <option value="false">False</option>
          <option value="true">True</option>
          </select>
      </label>
    </p>
    <p>
      <label>
        Preview:{" "}
        {errors?.preview ? (
          <em className="text-red-600">{errors.preview}</em>
        ) : null}
        <select
          name="preview"
          className={inputClassName}
          defaultValue={post.preview?.toString() || "false"}
        >
          <option value="false">False</option>
          <option value="true">True</option>
          </select>
      </label>
    </p>
    <p>
      <label>
        Excerpt:{" "}
        {errors?.excerpt ? (
          <em className="text-red-600">{errors.excerpt}</em>
        ) : null}
         <textarea
        id="excerpt"
        rows={5}
        name="excerpt"
        defaultValue={post.excerpt || ""}
        className={`${inputClassName} font-mono`}
      />
      </label>
    </p>
    <p>
      <label htmlFor="markdown">Markdown:           
          {errors?.markdown ? (
          <em className="text-red-600">
            {errors.markdown}
          </em>
        ) : null}
      </label>
      
      <br />
      <textarea
        id="markdown"
        rows={20}
        name="markdown"
        defaultValue={post.markdown}
        className={`${inputClassName} font-mono`}
      />
    </p>
    <p className="text-right flex w-full justify-between">
    <button
        type="submit"
        name="deleteButton"
        value={"delete"}
        className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
      >
        {isCreating ? "Editing..." : "Delete"}
      </button>
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        disabled={isCreating}
      >
        {isCreating ? "Editing..." : "Edit Post"}
      </button>
    </p>
  </Form>
  );
}