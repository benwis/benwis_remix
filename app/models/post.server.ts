import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";
export type { Post };
export { renderMarkdown } from "@benwis/femark-napi";
export { render_markdown } from "@benwis/femark"
export async function getPosts() {
    return prisma.post.findMany();
}
export async function getPost(slug: string) {
    return prisma.post.findUnique({ where: { slug } });
}
export async function createPost(
    post: Pick<Post, "slug" | "title" | "markdown" | "createdAt" | "updatedAt" | "excerpt">
) {
    return prisma.post.create({ data: post });
}