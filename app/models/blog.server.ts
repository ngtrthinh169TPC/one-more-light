import type { User, Blog } from "@prisma/client";

import { prisma } from "~/db.server";

export function getBlog({ id }: Pick<Blog, "id">) {
  return prisma.blog.update({
    data: { viewCount: { increment: 1 } },
    select: {
      id: true,
      type: true,
      body: true,
      title: true,
      viewCount: true,
      createdAt: true,
      createdBy: true,
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
      createdBy: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createBlog({
  body,
  type,
  title,
  creatorId,
}: Pick<Blog, "body" | "type" | "title"> & {
  creatorId: User["id"];
}) {
  return prisma.blog.create({
    data: {
      title,
      type,
      body,
      createdBy: {
        connect: {
          id: creatorId,
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

export function editBlog({
  id,
  title,
  body,
  editorId,
}: Pick<Blog, "id" | "title" | "body"> & {
  editorId: User["id"];
}) {
  return prisma.blog.update({
    where: { id },
    data: {
      title,
      body,
      editedBy: {
        connect: {
          id: editorId,
        },
      },
    },
  });
}
