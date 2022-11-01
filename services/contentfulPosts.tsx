const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchContentfulPosts() {
  const entries = await client.getEntries();
  if (entries.items) return entries.items;
  console.log(`Error getting Entries.`);
}

export default fetchContentfulPosts;
