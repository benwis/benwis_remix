import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser } from "~/session.server";

export const loader: LoaderFunction = async ({
    params, request
  }) => {
   let user = await getUser(request);
   // If the user is not me and not logged in, redirect to the login page
   if (!user || user.email !=="ben@benw.is"){
    return redirect("/login")
   }
   return null;
};

export default function AdminIndex() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create a New Post
      </Link>
    </p>
  );
}