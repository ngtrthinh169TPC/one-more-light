import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Navbar from "~/components/Navbar";
import { getAllBlogs } from "~/models/blog.server";

export const loader = async () => {
  const blogList = await getAllBlogs();
  return json({ blogList });
};

export default function BlogList() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />
      {data.blogList.length > 0 ? (
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
                <p className="text-sm" suppressHydrationWarning>
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • by{" "}
                  <span className="italic">
                    {item.createdBy.displayName || item.createdBy.email}
                  </span>
                </p>
              </header>
              <div
                className="mt-3 line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked(item.body)),
                }}
              />
            </article>
          ))}
        </main>
      ) : (
        <div className="mt-24 w-[600px]">
          There's no blog posted yet :(
          <br />
          If you are a guest, please come back later.
          <br />
          If you are the author, please fricking write something.
        </div>
      )}
    </div>
  );
}
