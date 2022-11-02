import { useRouter } from "next/router";
import {
  fetchContentfulPostBySlug,
  fetchContentfulPosts,
} from "../../services/contentfulPosts";
import { IPost, IResponseItem } from "../../types/types";

const Post = ({ posts }: any) => {
  if (!posts) return <div>Loading</div>;

  const targetPost = posts.fields;

  return (
    <div>
      <h2>{targetPost.title}</h2>
      <p>{targetPost.content.content[0].content[0].value}</p>
    </div>
  );
};

export default Post;

export async function getStaticProps({ params }: any) {
  const { items } = await fetchContentfulPostBySlug(params.slug);

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
  const posts = await res.map((post: IResponseItem) => {
    return post.fields;
  });

  const paths = posts.map((post: IPost) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}
