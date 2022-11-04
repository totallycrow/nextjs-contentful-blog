import Link from "next/link";
import React from "react";
import { fetchContentfulCategories } from "../../services/contentfulPosts";
import { ICategoryProps, ICategoryResponse } from "../../types/types";

interface ICategories {
  categories: Array<ICategoryResponse>;
}

export const index = ({ categories }: ICategories) => {
  console.log(categories);

  return (
    <div>
      {categories.map((category: ICategoryResponse) => {
        console.log(category);
        return (
          <div key={category.fields.slug}>
            <Link href={"/categories/" + category.fields.slug}>
              {category.fields.category}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default index;

export async function getStaticProps() {
  const categories = await fetchContentfulCategories();

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
}
