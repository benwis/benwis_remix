import indexStyles from "~/styles/indexStyles.css";
import { FeatureCard } from "~/components";
import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/models/post.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: indexStyles,
    },
  ];
}

type LoaderData = {   
	// this is a handy way to say: "posts is whatever type getPosts resolves to"
	posts: Awaited<ReturnType<typeof getPosts>>; 
};

export const loader: LoaderFunction = async ({
    params, request
  }) => {
   
    const posts = await getPosts(3);

    return json<LoaderData>({ posts });
};
export default function Index() {
	const { posts } = useLoaderData<LoaderData>();
  
	return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center border-gray-200 px-4 pb-16 md:pt-4 dark:border-gray-900 sm:px-8">
	<div className="flex flex-col-reverse items-start sm:flex-row">
		<div className="flex flex-col pr-8">
			<h1 className="mb-3 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
				I am
				<span
					className="relative ml-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg dark:bg-gray-900 before:py-8"
				>
						<span
							className="brand relative skew-y-3 py-4 px-2 text-7xl uppercase text-yellow-400 dark:text-yellow-400"
							>BENWIS
						</span>
				</span>
			</h1>
			<h2 className="mb-4 text-gray-700 dark:text-gray-200">
				Software Engineer, Full Stack Web Developer, Runner.
				<br />
				<span className="font-semibold">Rust, Typescript, WASM, Python, React, Svelte</span>
			</h2>
			<p className="mb-16 text-gray-600">
				<a href="https://github.com/benwis" className="rounded font-bold text-yellow-400 inline-flex items-center px-0 py-2 border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 hover:text-yellow-500"
					>Check out my work!
				</a>
			</p>
		</div>
	</div>
	<section className="mb-16 w-full">
		<h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
			Recent Posts
		</h3>
		<div className="flex flex-col gap-6 md:flex-row">
			{posts.map((post) => {
				let postDate = new Date(post.createdAt).toDateString();
				return (
				<FeatureCard key={post.slug} title={post.title} href={`posts/${post.slug}`} date={postDate} />

			)})}			
		</div>
		<Link
			className="mt-8 flex h-6 rounded-lg leading-7 text-gray-600 
				 transition-all dark:text-gray-400 dark:hover:text-gray-200"
			to="posts"
			>See more posts<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				className="ml-1 h-6 w-6"
				><path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
				/></svg>
		</Link>
	</section>
  </main>
  );
}
