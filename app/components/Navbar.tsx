import { NavLink } from "@remix-run/react";

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
  return (
    <div className="flex w-full justify-end bg-neutral-200 font-bold text-light-1-primary">
      {navigationList.map((item) => (
        <NavLink
          to={item.endpoint}
          key={`navlink-${item.title}`}
          className="select-none px-4 py-2"
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}
