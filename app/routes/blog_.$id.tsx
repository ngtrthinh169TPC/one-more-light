import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Navbar from "~/components/Navbar";
import { deleteBlog, getBlog } from "~/models/blog.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  // const userId = await requireUserId(request);
  invariant(params.id, "Blog with this title is not found");

  const blog = await getBlog({ id: params.id });
  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ blog });
};

export const action = async ({ params, request }: ActionArgs) => {
  // const userId = await requireUserId(request);
  invariant(params.id, "blog's id not found");

  await deleteBlog({ id: params.id });

  return redirect("/blog");
};

export default function BlogDetail() {
  const data = useLoaderData<typeof loader>();
  const blog = data.blog;

  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />
      <article className="mt-12 w-[600px]">
        <header className="relative">
          <span className="font-secondary font-bold text-neutral-400">
            {blog.type}
          </span>
          <h1 className="mb-3 font-secondary text-2xl font-bold text-light-1-primary">
            {blog.title}
          </h1>
          <p className="mb-6 text-right text-sm">
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            • by <span className="italic">{blog.user.email}</span>
          </p>
          <div className="absolute right-0 top-0 flex gap-2 ">
            {/* <button>Edit</button> */}
            <Form method="post">
              <button type="submit">Delete</button>
            </Form>
          </div>
        </header>
        <p className="overflow-hidden text-ellipsis whitespace-pre-line">
          {blog.body}
        </p>
      </article>
    </div>
  );
}
