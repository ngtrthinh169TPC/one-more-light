import type { User, Blog } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBlog({ id }: Pick<Blog, "id">) {
  return prisma.blog.findFirst({
    select: {
      id: true,
      type: true,
      body: true,
      title: true,
      createdAt: true,
      user: true,
    },
    where: { id },
  });
}

export function getAllBlogs() {
  return prisma.blog.findMany({
    select: {
      id: true,
      type: true,
      body: true,
      title: true,
      createdAt: true,
      user: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createBlog({
  body,
  type,
  title,
  userId,
}: Pick<Blog, "body" | "type" | "title"> & {
  userId: User["id"];
}) {
  return prisma.blog.create({
    data: {
      title,
      type,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteBlog({ id }: Pick<Blog, "id">) {
  return prisma.blog.deleteMany({
    where: { id },
  });
}
