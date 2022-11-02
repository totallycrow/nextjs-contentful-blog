const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchContentfulPosts() {
  const entries = await client.getEntries({
    content_type: "blog-post",
  });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries.`);
}

export async function fetchContentfulCategories() {
  const entries = await client.getEntries({
    content_type: "category",
  });
  if (entries.items) return entries.items;

  console.log(`Error getting Entries.`);
}

export async function fetchContentfulPostBySlug(slug: string) {
  const entry = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": slug,
  });

  if (entry) return entry;
  console.log(`Error getting Entry.`);
}

export async function fetchContentfulCategoryBySlug(slug: string) {
  return await client.getEntries({
    content_type: "category",
    "fields.slug": slug,
  });
}
