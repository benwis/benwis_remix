import { Form, useActionData, useTransition } from "@remix-run/react";
import { createPost } from "~/models/post.server";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import invariant from "tiny-invariant";


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
  const hero = formData.get("hero");
  const excerpt = formData.get("excerpt");
  const markdown = formData.get("markdown");
  let published = formData.get("published");
  let preview = formData.get("preview");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    excerpt: excerpt ? null : "Excerpt is required",
    markdown: markdown ? null : "Markdown is required",
    hero: hero ? null : "Hero is required",
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
  await createPost({ title, slug, excerpt, markdown, hero, published, preview });

  return redirect("/posts/admin");
};


const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg text-black bg-white`;

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);
  return (
    <Form method="post" className="text-black dark:text-white">
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
          />
        </label>
      </p>
      <p>
        <label>
          Hero Image:{" "}
          {errors?.hero ? (
            <em className="text-red-600">{errors.hero}</em>
          ) : null}
          <input
            type="text"
            name="hero"
            className={inputClassName}
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
          defaultValue={"false"}
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
          defaultValue={"false"}
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
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-yellow-400 py-2 px-4 text-gray-700 hover:bg-yellow-600 focus:bg-yellow-400 disabled:bg-yellow-300"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}