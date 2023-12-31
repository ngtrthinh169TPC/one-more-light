import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Input, Select, TextArea } from "~/components/Input";
import Navbar from "~/components/Navbar";
import { blogTypeConst } from "~/constants/blog.const";
import { createBlog } from "~/models/blog.server";
import { requireAdminId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireAdminId(request);
  return null;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireAdminId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const type = formData.get("type");

  if (typeof title !== "string" || title.length === 0) {
    return json({ errors: { title: "Title is required" } }, { status: 400 });
  }

  if (typeof body !== "string" || body.length === 0) {
    return json({ errors: { body: "Body is required" } }, { status: 400 });
  }

  if (typeof type !== "string" || type.length === 0) {
    return json({ errors: { type: "Type is required" } }, { status: 400 });
  }

  const blog = await createBlog({
    title,
    body,
    type,
    creatorId: userId,
  });

  return redirect(`/blog/${blog.id}`);
};

export default function NewBlog() {
  const actionData = useActionData<typeof action>();

  const errorMessage: string = actionData?.errors.toString() || "";

  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />
      <Form method="post" className="mt-12 flex w-[600px] flex-col gap-4">
        <h1 className="font-secondary text-2xl">Your new blog</h1>
        {/* TODO: aria-invalid & aria-describedby */}
        <Input label="Blog title" name="title" required autoFocus />
        <TextArea label="Content" name="body" required />
        <Select label="Blog type" name="type" options={blogTypeConst} />
        <button
          type="submit"
          className="mt-4 w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          {"Post your blog -->"}
        </button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </Form>
    </div>
  );
}
