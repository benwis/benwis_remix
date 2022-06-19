import React from "react";
import { Link } from "@remix-run/react";
export function PortfolioCard({img, href, heading, subheading, description}:{img:string, href:string, heading:string, subheading:string, description:string}) {
  return (
    <section>
	<Link to={href}>
	<div className="space-y-4">
	    <div className="aspect-w-3 aspect-h-2">
		    <img className="object-cover h-200px shadow-lg rounded-lg" src={img} alt=""/>
        </div>

        <div className="space-y-2">
            <div className="text-lg leading-6 font-medium space-y-1">
                <h3 className="dark:text-white text-black">{heading}</h3>
                <p className="text-indigo-600">{subheading}</p>
            </div>
            <div role="list" className="flex space-x-5 no-underline">
                <p className="dark:text-white text-black">{description}</p>
            </div>
        </div>
    </div>
	</Link>
	  </section>
  );
}