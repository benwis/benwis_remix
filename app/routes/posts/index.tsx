import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};


export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  console.log(`POSTS: ${JSON.stringify(posts)}`);
  return (
    <main className="dark:text-white max-w-5xl px-12">
      <h1 className="mb-4 text-3xl text-center font-bold tracking-tight text-black dark:text-white md:text-5xl">Posts</h1>
      <Link to="admin" className="text-red-600 underline">
  Admin
</Link>
      <ul>
        {posts.map((post) => (
          <ul key={post.slug}>
            <Link
              to={post.slug}
              className="no-underline hover:underline hover:decoration-yellow-400"
            >
            <li className="mb-8 text-lg">
            <div className="inline-flex justify-between w-full">
              <h4 className="text-lg font-medium md:text-xl">{post.title}</h4>
              <p className=" text-left text-gray-500 dark:text-gray-400 md:mb-0 md:text-right">{post.createdAt}</p>
            </div>
            <p className="text-gray-500">{post.excerpt}</p>
            </li>
            </Link>
          </ul>
        ))}
      </ul>
    </main>
  );
}