import type { User, Blog } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBlog({
  id,
}: Pick<Blog, "id"> & {
  userId: User["id"];
}) {
  return prisma.blog.findFirst({
    select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function getBlogList() {
  return prisma.blog.findMany({
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createBlog({
  body,
  title,
  userId,
}: Pick<Blog, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.blog.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteBlog({
  id,
  userId,
}: Pick<Blog, "id"> & { userId: User["id"] }) {
  return prisma.blog.deleteMany({
    where: { id, userId },
  });
}
