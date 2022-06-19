import { prisma } from "~/db.server";
import type { Post } from "@prisma/client";
export type { Post };
export { renderMarkdown } from "@benwis/femark-napi";
export { render_markdown } from "@benwis/femark"

export async function getPosts(take: number = 0) {
    if (take != 0) {
        return prisma.post.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ], take
        });
    }
    else {
        return prisma.post.findMany({
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ]
        });
    }
}
export async function getPost(slug: string) {
    return prisma.post.findUnique({ where: { slug } });
}
export async function createPost(
    post: Pick<Post, "slug" | "title" | "markdown" | "excerpt">
) {
    return prisma.post.create({ data: post });
}

export async function updatePost(post: Pick<Post, "slug" | "title" | "markdown" | "excerpt">
) {
    return prisma.post.update({ where: { slug: post.slug }, data: post })
}

export async function deletePost(slug: string) {
    return prisma.post.delete({
        where: {
            slug
        }
    })
}