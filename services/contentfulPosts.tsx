import { createClient } from "contentful";
import { IPost, IResponseItem } from "../types/types";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space || "",
  accessToken: accessToken || "",
});

export async function fetchContentfulPosts<T>(): Promise<T> {
  const entries = await client.getEntries({
    content_type: "blog-post",
  });
  return entries.items as T;
}

export async function fetchContentfulCategories() {
  const entries = await client.getEntries({
    content_type: "category",
  });
  if (entries.items) return entries.items;

  console.log(`Error getting Entries.`);
}

export async function fetchContentfulPostBySlug<T>(slug: string): Promise<T> {
  const entry = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": slug,
  });

  return entry.items as T;
}

export async function fetchContentfulCategoryBySlug(slug: string) {
  return await client.getEntries({
    content_type: "category",
    "fields.slug": slug,
  });
}
