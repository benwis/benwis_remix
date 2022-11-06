import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalStyles from "./styles/globalStyles.css";
import { getUser, isMe } from "./session.server";
import { Nav, Footer } from "./components";
import { useLoaderData } from "@remix-run/react";
import clsx from 'clsx';

import {
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
} from "~/utils/theme-provider";
import type { Theme } from "~/utils/theme-provider";
import { getThemeSession } from "~/utils/theme.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }, {rel: "stylesheet", href: globalStyles}];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "benw.is",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  admin: Awaited<ReturnType<typeof isMe>>;
  theme: Theme | null;
  env: "development" | "production" | "test"; 
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  return json<LoaderData>({
    user: await getUser(request),
    admin: await isMe(request),
    theme: themeSession.getTheme(),
    env: process.env.NODE_ENV,

  });
};

function App() {
  const { admin, user, env } = useLoaderData<LoaderData>();
  const [theme] = useTheme();
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className={`${clsx(theme)} h-full`}>
      <head>
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(data.theme)} />
        <a rel="me" href="https://hachyderm.io/@benwis">Mastodon</a>
        {env === "production" && (
        <script
          src="https://clean-piano.benw.is/script.js"
          data-spa="auto"
          data-site="PCCFUQTY"
          defer
        ></script>
      )}
      </head>
      <body className="h-screen bg-white dark:bg-gray-900 max-w-5xl mx-auto flex flex-col">
        <Nav admin={admin} email={user?.email}/>
        <Outlet />
        <Footer/>
        <ThemeBody ssrTheme={Boolean(data.theme)} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}