import { useSuspenseQuery } from "@apollo/client";
import { graphql } from "@/gql";

import { PostSummary } from "../PostSummary";

export const query = graphql(`
  query PopularPosts_Query {
    popularPosts {
      id
      ...PostSummary_Post
    }
  }
`);

export function PopularPosts() {
  const { data } = useSuspenseQuery(query);
  if (data.popularPosts.length === 0) {
    return <>No posts</>;
  }
  return (
    <ul>
      {data.popularPosts.map((post) => (
        <li key={post.id}>
          <PostSummary id={post.id} />
        </li>
      ))}
    </ul>
  );
}
