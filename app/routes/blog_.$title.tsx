import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Navbar from "~/components/Navbar";
import { getBlog } from "~/models/blog.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  // const userId = await requireUserId(request);
  invariant(params.title, "Blog with this title is not found");

  const blog = await getBlog({ title: params.title });
  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ blog });
};

export default function Blog() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="bg-light-1-background font-primary relative min-h-screen  sm:flex sm:flex-col sm:items-center">
      <Navbar />
      <h2>{data.blog.title}</h2>
      <p>{data.blog.body}</p>
    </div>
  );
}
