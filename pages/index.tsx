import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import fetchContentfulPosts from "../services/contentfulPosts";
import { PostCard } from "../components/PostCard";
import { Navbar } from "../components/Layout/Navbar";

const Home: NextPage = ({ posts }: any) => {
  console.log(posts);
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold underline">Blog</h1>
        <div className="bg-slate-50 p-4 m-auto">
          <div className="m-auto w-1/2">
            <h2>New Stories</h2>
            <div className="grid grid-cols-3 gap-4">
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetchContentfulPosts();
  const posts = await res.map((post: any) => {
    return post.fields;
  });

  return {
    props: {
      posts,
    },
  };
}
