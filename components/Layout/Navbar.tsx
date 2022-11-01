import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full bg-slate-800 h-10 flex">
      <div className="m-auto flex">
        <li className="list-none text-slate-100 p-2">
          <Link href="/">Home</Link>
        </li>
        <li className="list-none text-slate-100 p-2">
          <Link href="/categories">Categories</Link>
        </li>
      </div>
    </div>
  );
};
