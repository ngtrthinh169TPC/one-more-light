import { Form, NavLink } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

const navigationList = [
  {
    title: "Home",
    endpoint: "/",
  },
  {
    title: "All blogs",
    endpoint: "/blog",
  },
  {
    title: "New blog",
    endpoint: "/blog/new",
  },
];

export default function Navbar() {
  const user = useOptionalUser();

  return (
    <div className="flex w-full items-center justify-between bg-neutral-200 font-bold text-light-1-primary">
      <div className="px-4 py-2">{user?.email}</div>
      <div className="flex">
        {navigationList.map((item) => (
          <NavLink
            to={item.endpoint}
            key={`navlink-${item.title}`}
            className="select-none px-4 py-2"
          >
            {item.title}
          </NavLink>
        ))}
        {user ? (
          <Form action="/logout" method="post">
            <button type="submit" className="select-none px-4 py-2">
              Log out
            </button>
          </Form>
        ) : (
          <NavLink to="/login" className="select-none px-4 py-2">
            Log in
          </NavLink>
        )}
      </div>
    </div>
  );
}
