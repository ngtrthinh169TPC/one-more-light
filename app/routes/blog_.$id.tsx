import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import invariant from "tiny-invariant";
import Navbar from "~/components/Navbar";
import SvgDelete from "~/components/svgs/Delete";
import SvgEditNote from "~/components/svgs/EditNote";
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
  const { blog } = useLoaderData<typeof loader>();

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
          <div className="absolute right-0 top-0 flex items-start gap-2">
            <button>
              <NavLink to="edit">
                <SvgEditNote className="hover:fill-light-1-primary" />
              </NavLink>
            </button>
            <Form method="post">
              <button type="submit">
                <SvgDelete className="hover:fill-light-1-primary" />
              </button>
            </Form>
          </div>
        </header>
        <div
          className="overflow-hidden text-ellipsis whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked(blog.body)),
          }}
        />
      </article>
    </div>
  );
}
