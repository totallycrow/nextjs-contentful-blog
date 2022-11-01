import React from "react";
import Image from "next/image";
import Link from "next/link";

export const PostCard = () => {
  return (
    <div className="flex-column content-center m-auto text-center">
      <Image src="" height={300} width={300} alt="" />
      <div className="py-2 text-left">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
        natus.
      </div>
      <Link href="">
        <button className="bg-slate-800 text-slate-50 p-2 rounded-md">
          Read More
        </button>
      </Link>
    </div>
  );
};
