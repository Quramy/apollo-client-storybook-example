import { graphql, type DocumentType } from "../../gql";

import { useFragment } from "@apollo/client";

import { User } from "../User";

export const fragment = graphql(`
  fragment PostSummary_Post on Post {
    id
    title
    author {
      id
      ...User_User
    }
  }
`);

type Props = {
  readonly id: string;
};

export function PostSummary({ id }: Props) {
  const { complete, data: post } = useFragment<DocumentType<typeof fragment>>({
    fragment,
    fragmentName: "PostSummary_Post",
    from: {
      __typename: "Post",
      id,
    },
  });

  if (!complete) return null;

  console.log(post);

  return (
    <>
      <a href={`/posts/${post.id}`}>{post.title}</a>
      written by <User id={post.author.id} />
    </>
  );
}
