import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Navbar from "~/components/Navbar";
import { getAllBlogs } from "~/models/blog.server";
// import { requireUserId } from "~/session.server";

export const loader = async () => {
  // const userId = await requireUserId(request);
  const blogList = await getAllBlogs();
  return json({ blogList });
};

export default function BlogList() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />

      <main className="mt-12 flex w-[600px] max-w-2xl flex-col gap-12">
        <h1 className="font-secondary text-2xl font-bold">Hello World</h1>
        {data.blogList.map((item) => (
          <article key={`blog-${item.id}`}>
            <header>
              <h3 className="font-secondary text-xl font-bold text-light-1-primary">
                <NavLink to={`${item.id}`}>
                  {item.type}: {item.title}
                </NavLink>
              </h3>
              <p className="text-sm">
                {new Date(item.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                • by <span className="italic">{item.user.email}</span>
              </p>
            </header>
            <p
              className="mt-3 line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(item.body)),
              }}
            ></p>
            {/* TODO: Add some lines of description */}
          </article>
        ))}
      </main>
    </div>
  );
}
