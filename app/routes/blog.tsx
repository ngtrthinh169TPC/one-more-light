import { json } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import { getAllBlogs } from "~/models/blog.server";
// import { requireUserId } from "~/session.server";

export const loader = async () => {
  // const userId = await requireUserId(request);
  const blogList = await getAllBlogs();
  return json({ blogList });
};

export default function Landing() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="bg-light-1-background font-primary relative min-h-screen  sm:flex sm:flex-col sm:items-center">
      <Navbar />

      <main className="flex w-full max-w-2xl flex-col gap-4">
        <h1 className="font-secondary text-2xl font-bold">Hello World</h1>
        {data.blogList.map((item) => (
          <article key={item.title}>
            <header>
              <h3 className="font-secondary text-light-1-primary mb-1 mt-6 text-xl font-bold">
                <NavLink to={`${item.title}`}>
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
          </article>
        ))}
      </main>
    </div>
  );
}
