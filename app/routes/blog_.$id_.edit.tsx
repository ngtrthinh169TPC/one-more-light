import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { Input, TextArea } from "~/components/Input";
import Navbar from "~/components/Navbar";
import { editBlog, getBlog } from "~/models/blog.server";

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
  invariant(params.id, "Blog with this title is not found");

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "Body is required" } }, { status: 400 });
  }

  const blog = await editBlog({
    id: params.id,
    title: title,
    body: body,
  });

  return redirect(`/blog/${blog.id}`);
};

export default function BlogEdit() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />
      <Form
        method="post"
        className="relative mt-12 flex w-[600px] flex-col gap-4"
      >
        <h1 className="font-secondary text-2xl">Editing...</h1>
        {/* TODO: aria-invalid & aria-describedby */}
        <Input
          label="Blog title"
          name="title"
          defaultValue={blog.title}
          required
        />
        <TextArea
          label="Content"
          name="body"
          defaultValue={blog.body}
          required
          autoFocus
        />
        <div className="mt-4 flex gap-4">
          <button className="w-fit rounded bg-rose-500 px-4 py-2 text-white hover:bg-rose-600 focus:bg-rose-400">
            <NavLink to={`/blog/${blog.id}`}>Discard</NavLink>
          </button>
          <button
            type="submit"
            className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save your changes
          </button>
        </div>
      </Form>
    </div>
  );
}
