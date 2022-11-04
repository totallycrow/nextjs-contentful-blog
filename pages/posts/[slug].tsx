import { GetStaticProps } from "next";
import {
  fetchContentfulPostBySlug,
  fetchContentfulPosts,
} from "../../services/contentfulPosts";
import { IFullPostData, IPost, IResponseItem, Params } from "../../types/types";

// fetch

// 1. typy
// 2. logika ->
// 3. wymagania biznesowe

// mocks: [], { title: "", asdasdas: [] }
// preprocessing
// sekcje

// ui / logiki
// type HeadingProps = Pick<PostPage, "heading">;

interface PostPage {
  shared: {
    posts: Array<string>;
  };
  sections: {
    content: any;
    title: string;
  };
}

const Post: React.FC<PostPage> = (props) => {
  console.log("PROPS MAIN POSTS");
  console.log(props);

  const content = props.sections.content.content[0].content[0].value;
  const title = props.sections.title;

  if (!content || !title) return <div>Loading</div>;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Post;

// ************************************************************************************************************
export const getStaticProps: GetStaticProps<PostPage, Params> = async (
  context
) => {
  const params = context.params!;
  const { slug } = params;

  const entry = (await fetchContentfulPostBySlug(slug)) as Array<IFullPostData>;

  if (!entry.length)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const targetPost = entry[0];

  return {
    props: {
      shared: {
        posts: [targetPost.sys.id],
      },
      sections: {
        content: targetPost.fields.content,
        title: targetPost.fields.title,
      },
      revalidate: 60,
    },
  };
};

// ************************************************************************************************************
export async function getStaticPaths() {
  const res = await fetchContentfulPosts<Array<IResponseItem>>();
  if (res instanceof Error) return;

  const posts = res.map((post: IResponseItem) => {
    return post.fields as IPost;
  });

  const paths = posts.map((post: IPost) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}
