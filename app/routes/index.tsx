import indexStyles from "~/styles/indexStyles.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: indexStyles,
    },
  ];
}

export default function Index() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center border-gray-200 px-4 pb-16 md:pt-4 dark:border-gray-900 sm:px-8">
    <div className="flex flex-col-reverse items-start sm:flex-row">
		<div className="flex flex-col pr-8">
			<h1 className="mb-3 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
				I am
				<span
					className="relative ml-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg before:bg-gray-900 before:py-8"
				>
						<span
							className="brand relative skew-y-3 py-4 px-2 text-7xl uppercase text-yellow-400 dark:text-yellow-400"
							>BENWIS</span
						>
				</span>
				
			</h1>
			<h2 className="mb-4 text-gray-700 dark:text-gray-200">
				Software Engineer, Full Stack Web Developer, Runner.
				<br />
				<span className="font-semibold">Rust, Typescript, WASM, Python, React, Svelte</span>
			</h2>
			<p className="mb-16 text-gray-600 dark:text-gray-400">
				<a href="https://github.com/benwis" className="rounded font-bold text-yellow-400 inline-flex items-center px-4 dark:px-0 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-stone-800 dark:bg-gray-900 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 hover:text-yellow-500"
					>Check out my work!</a
				>
			</p>
		</div>
	</div>
  </main>
  );
}
