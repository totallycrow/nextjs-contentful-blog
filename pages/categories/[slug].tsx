import { useRouter } from "next/router";
import {
  fetchContentfulCategories,
  fetchContentfulCategoryBySlug,
  fetchContentfulPosts,
} from "../../services/contentfulPosts";
import { IPost, IResponseItem } from "../../types/types";

const Category = (props: any) => {
  console.log(props);
  const router = useRouter();
  const { slug } = router.query;

  return <p>Category: {slug}</p>;
};

export default Category;

export async function getStaticProps({ params }: any) {
  const category = await fetchContentfulCategoryBySlug(params.slug);

  if (category.items.length === 0 || !category) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const targetCategory = category.items[0].fields.slug;

  return {
    props: {
      targetCategory,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await fetchContentfulCategories();
  const categories = await res.map((post: IResponseItem) => {
    return post.fields;
  });

  const paths = categories.map((post: IPost) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}
