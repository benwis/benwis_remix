import { PortfolioCard } from "../components/PortfolioCard";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	
	return {
		title: "My Portfolio",
		description: "A collection of things I've built or helped build.",
		'og:title': "My Portfolio",
		'og:description': "A collection of things I've built or helped build.",
	}
}

export default function Portfolio() {
  return (
    <article
	className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center px-4 sm:px-8"
>
	<h1 className="mb-2 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl ">
		Portfolio
	</h1>
	<div
		className="bg mt-2 flex w-full justify-between sm:flex-col sm:items-start md:flex-row md:items-center"
	>
		<p className="min-w-32 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0"></p>
	</div>
	<div
		className="-mx-4 my-2 flex h-1 w-[100vw] bg-gradient-to-r from-yellow-400 via-rose-400 to-cyan-500 sm:mx-0 sm:w-full"
	/>

	<div className="mt-16 mb-32 w-full max-w-none dark:prose-invert">
		<main
			role="list"
			className="space-y-12 no-underline sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8"
		>
			<PortfolioCard
				heading="Praxis Cycles"
				subheading="Ecommerce Store"
				href="https://praxiscycles.com"
				img="/img/praxiscycles_square.png"
				description="Praxis Cycles is a bike parts supplier that does over a million dollars in annual sales. I redesigned the site to a media heavy layout, optimized image distribution, and massively decreased page load time"
			/>
			<PortfolioCard
				heading="Praxis OEM Site"
				subheading="B2B Sales Site"
				href="https://oem.praxiscycles.com"
				img="/img/praxis_oem_square.png"
				description="Praxis' OEM site is a login only site that lists their hundreds of available parts for dealers to purchase. I built the frontend using Remix, React, and TailwindCSS. The backend is a custom rust GraphQL server linked to Airtable and Sanity for data entry."
			/>
		</main>
	</div>
</article>
  );
}