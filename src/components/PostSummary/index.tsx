import { graphql } from "../../gql";

import { useFragment } from "@apollo/client";

import { Avatar } from "../Avatar";

export const fragment = graphql(`
  fragment PostSummary_Post on Post {
    id
    title
    description
    author {
      id
      name
      ...Avatar_User
    }
  }
`);

type Props = {
  readonly id: string;
};

export function PostSummary({ id }: Props) {
  const { complete, data: post } = useFragment({
    fragment,
    fragmentName: "PostSummary_Post",
    from: {
      __typename: "Post",
      id,
    },
  });

  if (!complete) return null;

  return (
    <>
      <a href={`/posts/${post.id}`}>
        <header>{post.title}</header>
        <p>{post.description}</p>
        <Avatar id={post.author.id} /> <span>{post.author.name}</span>
      </a>
    </>
  );
}
