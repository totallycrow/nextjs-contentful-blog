import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
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

  const content = props.sections.content.content;
  console.log(content);
  const title = props.sections.title;

  // dispatch(loadPosts, shared);

  // if (!posts) return <div>Loading</div>;
  // const targetPost = posts.fields;

  return (
    <div>
      <h2>{title}</h2>
      <p>{content[0].content[0].value}</p>
    </div>
  );
};

interface IParam {
  slug: string;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface IFullPostData {
  metadata: { tags: [] };
  sys: {
    space: [Object];
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: [Object];
    revision: number;
    contentType: [Object];
    locale: string;
  };
  fields: {
    mainImage: [Object];
    title: string;
    content: [Object];
    slug: string;
    postCategory: string;
  };
}

export default Post;

export const getStaticProps: GetStaticProps<PostPage, Params> = async (
  context
) => {
  const params = context.params!;

  console.log("GET STATIC PROPS - POSTS");
  console.log(params);
  const { slug } = params;

  const entry = (await fetchContentfulPostBySlug(
    params?.slug
  )) as Array<IFullPostData>;
  console.log(entry);
  // const preprocessedHeading = preprocessHeading(items);

  if (!entry.length)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const targetPost = entry[0];

  // const props: PostPage = {
  //   heading: (await getHeading()) || mock,
  // };

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

export async function getStaticPaths() {
  console.log("STATIC PATHS - POSTS");
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
