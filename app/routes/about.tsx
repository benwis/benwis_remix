import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};

export default function About() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <div
	className="mx-auto grid max-w-2xl grid-cols-1 items-start justify-center gap-y-20 border-gray-200 px-4 pb-16 dark:border-gray-900 sm:px-8 md:grid-cols-2 md:gap-x-20"
>
	<section>
		<div className="">
			<div
				className="flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-900"
			>
				<div className="flex flex-col-reverse items-start sm:flex-row">
					<div className="flex w-full flex-col pr-8">
						<h1 className="text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
							I am
		
							<span
								className="relative ml-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg before:py-8"
							>
								<span
                  className="brand relative py-8 text-5xl uppercase text-yellow-400"
                  >
                    BENWIS
								</span>
							</span>
						</h1>
					</div>
				</div>
			</div>
			<div
				className="mb-6 flex max-w-2xl flex-col items-start justify-center border-gray-200 dark:border-gray-900"
			>
				<div className="flex flex-col-reverse items-start sm:flex-row">
					<div className="flex w-full flex-col pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-black dark:text-white md:text-2xl">
							AKA
								<span
									className="relative ml-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg"
								>
									<span
										className="brand relative skew-y-3 py-8 text-4xl uppercase text-yellow-400 dark:text-yellow-400"
										>Ben Wishovich</span
									>
								</span>
						</h1>
					</div>
				</div>
			</div>
		</div>
		<p className="text-black dark:text-white">
			I'm a Software Engineer and Full Stack Web Developer, living and working in the SF Bay Area. I
			graduated from San Jose State with a degree in Industrial and Systems Engineering, and then
			made the jump into software QA and web development.
		</p>
		<p className="text-black dark:text-white">
			I've been coding and building things since High School, and have helped build a variety of
			projects. Everything from mapping software for UAVs, motor controllers for automated vending
			machines, to electric motorcycle diagnostic software.
		</p>
		<p className="text-black dark:text-white">
			I currently work in SQA at Zero Motorcycles, designing and build software to diagnose and test
			electric motorcycle firmware. In my spare time I build web experiences using Python,
			TypeScript, and Rust along with React, Remix, and Svelte. Currently exploring the boundaries
			of web development with WASM, GraphQL, Remix, and Svelte.
		</p>
	</section>
	<section>
		<img
			className="rounded"
			src="/img/ben_catcarbon.jpeg"
			alt="A white guy with blue eyes, dark hair, and glasses. Kinda looks like Harry Potter. Can totally dance"
		/>
		<address
			className="my-4 w-full transform rounded-xl bg-gradient-to-r from-yellow-400 via-rose-400 to-cyan-500 p-1 transition-all hover:scale-[1.01]"
		>
			<section className="flex flex-col rounded-lg bg-white p-4 dark:bg-gray-900">
				<h3 className="text-xl text-black dark:text-white">Contact Me:</h3>

				<a href="mailto:ben@benw.is" className="text-black dark:text-white">Email</a>
				<a href="https://twitter.com/iambenwis" className="text-black dark:text-white">Twitter</a>
			</section>
		</address>
	</section>
</div>
  );
}