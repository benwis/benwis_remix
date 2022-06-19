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

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    excerpt: excerpt ? null : "Excerpt is required",
    markdown: markdown ? null : "Markdown is required",

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

  await createPost({ title, slug, excerpt, markdown });

  return redirect("/posts/admin");
};


const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg text-black`;

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition();
    const isCreating = Boolean(transition.submission);
  return (
    <Form method="post">
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