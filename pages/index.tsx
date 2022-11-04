import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { fetchContentfulPosts } from "../services/contentfulPosts";
import { PostCard } from "../components/PostCard";
import { IPost, IResponseItem } from "../types/types";

interface HomePageProps {
  content: Array<IPost>;
}

const Home = ({ content }: HomePageProps) => {
  console.log(content);
  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold underline">Blog</h1>
        <div className="bg-slate-50 p-4 m-auto">
          <div className="m-auto w-1/2">
            <h2>New Stories</h2>
            <div className="grid grid-cols-3 gap-4">
              {content.map((post: IPost) => {
                return (
                  <PostCard
                    key={post.slug}
                    slug={post.slug}
                    image={"https:" + post.mainImage.fields.file.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetchContentfulPosts<Array<IResponseItem>>();

  const content = res.map((post: IResponseItem) => {
    return post.fields;
  });

  return {
    props: {
      content,
    },
    revalidate: 60,
  };
}
