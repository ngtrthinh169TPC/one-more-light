import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Navbar from "~/components/Navbar";
import { getBlog } from "~/models/blog.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  // const userId = await requireUserId(request);
  invariant(params.id, "Blog with this title is not found");

  const blog = await getBlog({ id: params.id });
  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ blog });
};

export default function BlogDetail() {
  const data = useLoaderData<typeof loader>();
  const blog = data.blog;

  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />
      <article className="mt-12 w-[600px]">
        <header>
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
        </header>
        <p className="overflow-hidden text-ellipsis whitespace-pre-line">
          {blog.body}
        </p>
      </article>
    </div>
  );
}
