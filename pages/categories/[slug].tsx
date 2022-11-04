import { useRouter } from "next/router";
import {
  fetchContentfulCategories,
  fetchContentfulCategoryBySlug,
  fetchContentfulPosts,
} from "../../services/contentfulPosts";
import { IFullCategoryData, IPost, IResponseItem } from "../../types/types";

const Category = (props: any) => {
  console.log(props);
  const router = useRouter();
  const { slug } = router.query;

  return <p>Category: {slug}</p>;
};

export default Category;

export async function getStaticProps({ params }: any) {
  const category = await fetchContentfulCategoryBySlug<IFullCategoryData>(
    params.slug
  );

  if (!category) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const targetCategory = category.fields.slug;

  return {
    props: {
      targetCategory,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  console.log("STATIC PATHS - CATEGORIES");
  const res = await fetchContentfulCategories<Array<IFullCategoryData>>();
  if (!res) return;
  console.log(res);

  const categories = await res.map((post) => {
    return post.fields;
  });

  const paths = categories.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}
