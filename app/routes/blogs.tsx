import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getBlogList } from "~/models/blog.server";
// import { useOptionalUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const blogList = await getBlogList();
  return json({ blogList });
};

export default function BlogsPage() {
  const data = useLoaderData<typeof loader>();
  // const user = useOptionalUser();

  return (
    <div className="flex h-full min-h-screen flex-col items-center">
      <header className="flex w-full max-w-[600px] items-center justify-between bg-lime-200">
        <h1 className="text-3xl font-bold">
          <Link to=".">Blogs</Link>
        </h1>
      </header>

      <main className="flex h-full w-full max-w-[600px] bg-slate-200">
        <div className="h-full w-80 border-r bg-slate-200">
          {/* <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Blog
          </Link> */}

          {/* <hr /> */}

          {data.blogList.length === 0 ? (
            <p className="p-4">No blogs yet</p>
          ) : (
            <ol>
              {data.blogList.map((blog) => (
                <li key={blog.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={blog.id}
                  >
                    📝 {blog.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
    </div>
  );
}
