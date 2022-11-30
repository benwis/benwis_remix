import type { LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/models/post.server";

export type RssEntry = {
    title: string;
    link: string;
    description: string | null;
    pubDate: string;
    author?: string;
    guid?: string;
  };
  
  export function generateRss({
    description,
    entries,
    link,
    title,
  }: {
    title: string;
    description: string;
    link: string;
    entries: RssEntry[];
  }): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <language>en-us</language>
      <ttl>60</ttl>
      <atom:link href="https://benw.is/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
        .map(
          (entry) => `
        <item>
          <title><![CDATA[${entry.title}]]></title>
          <description><![CDATA[${entry.description}]]></description>
          <pubDate>${entry.pubDate}</pubDate>
          <link>${entry.link}</link>
          ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ""}
        </item>`
        )
        .join("")}
    </channel>
  </rss>`;
  }

  export const loader: LoaderFunction = async () => {
    const posts = await getPosts();
  
    const feed = generateRss({
      title: "benwis Blog",
      description: "The potentially misguided ramblings of a Rust developer flailing around on the web",
      link: "https://benw.is/posts",
      entries: posts.filter(post => post.published).map((post) => ({
        description: post.excerpt,
        pubDate: new Date(post.createdAt).toUTCString(),
        title: post.title,
        link: `https://benw.is/posts/${post.slug}`,
        guid: `https://benw.is/posts/${post.slug}`,
      })),
    });
  
    return new Response(feed, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=2419200",
      },
    });
  };
  