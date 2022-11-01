import React from "react";
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ image, title, description, slug }: any) => {
  return (
    <div className="flex-column content-center m-auto text-center">
      <div className="h-40 w-40 relative ">
        {" "}
        <Image src={image} layout="fill" alt="" className="object-cover" />
      </div>

      <div className="py-2 text-left">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
        natus.
      </div>
      <Link href={`./posts/${slug}`}>
        <button className="bg-slate-800 text-slate-50 p-2 rounded-md">
          Read More
        </button>
      </Link>
    </div>
  );
};
