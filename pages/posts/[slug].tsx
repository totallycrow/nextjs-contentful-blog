import { useRouter } from "next/router";
import {
  fetchContentfulPosts,
  fetchSingleContentfulEntry,
} from "../../services/contentfulPosts";

const Post = ({ posts }: any) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(posts);
  console.log(slug);

  const targetPost = posts.find((post: any) => post.slug === slug);
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

export async function getStaticPaths() {
  const res = await fetchContentfulPosts();
  const posts = await res.map((post: any) => {
    return post.fields;
  });

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
