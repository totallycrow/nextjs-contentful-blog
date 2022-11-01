import { useRouter } from "next/router";
import {
  fetchContentfulPosts,
  fetchContentfulPostBySlug,
} from "../../services/contentfulPosts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Post = ({ posts }: any) => {
  if (!posts) return <div>Loading</div>;

  const targetPost = posts.fields;
  console.log(targetPost);
  console.log("Test");
  console.log(targetPost.content.content[0].content[0].value);

  return (
    <div>
      <h2>{targetPost.title}</h2>
      <p>{targetPost.content.content[0].content[0].value}</p>
    </div>
  );
};

export default Post;

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": params.slug,
  });
  // const posts = await res.map((post: any) => {
  //   return post.fields;
  // });
  if (!items.length)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const posts = items[0];

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await fetchContentfulPosts();
  const posts = await res.map((post: any) => {
    return post.fields;
  });

  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}
