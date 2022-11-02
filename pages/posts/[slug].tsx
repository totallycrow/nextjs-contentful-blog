import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  fetchContentfulPostBySlug,
  fetchContentfulPosts,
} from "../../services/contentfulPosts";
import { IPost, IPosts, IResponseItem } from "../../types/types";

// fetch

// 1. typy
// 2. logika ->
// 3. wymagania biznesowe

// mocks: [], { title: "", asdasdas: [] }
// preprocessing
// sekcje

// ui / logiki

interface PostPage {
  shared: {
    posts: [];
  };
  sections: {
    heading: {};
    content: {};
  };
}

type HeadingProps = Pick<PostPage, "heading">;

const Post = ({ heading, shared }: PostPage) => {
  dispatch(loadPosts, shared);

  if (!posts) return <div>Loading</div>;
  const targetPost = posts.fields;

  return (
    <div>
      <Heading {...heading} />
      <h2>{targetPost.title}</h2>
      {/* dangerouslySetInnerHTML={} */}
      <p>{targetPost.content.content[0].content[0].value}</p>
    </div>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // sanity (platforma od errorów)
  const { items } = await fetchContentfulPostBySlug(params.slug);
  const preprocessedHeading = preprocessHeading(items);

  if (!items.length)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const posts = items[0];

  const props: PostPage = {
    heading: (await getHeading()) || mock,
  };

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

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
