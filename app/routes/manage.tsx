import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import { getUserList } from "~/models/user.server";
import { requireAdmin } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  await requireAdmin(request);
  const userList = await getUserList();
  return json({ userList });
};

export default function ManagePage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="relative min-h-screen bg-light-1-background font-primary sm:flex sm:flex-col sm:items-center">
      <Navbar />

      <main className="mt-12 flex w-[600px] max-w-2xl flex-col">
        <h1 className="mb-6 font-secondary text-2xl font-bold">User list</h1>
        {data.userList.map((item) => (
          <div key={`user-${item.email}`}>
            {item.email} - {item.displayName ? item.displayName : "_"}
          </div>
        ))}
      </main>
    </div>
  );
}
