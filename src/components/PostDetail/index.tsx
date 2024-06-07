import { useFragment, useMutation } from "@apollo/client";
import { graphql } from "@/gql";

import { Avatar } from "../Avatar";

type Props = {
  readonly id: string;
};

export const fragment = graphql(`
  fragment PostDetail_Post on Post {
    id
    title
    body
    bookmarked
    author {
      id
      name
      ...Avatar_User
    }
  }
`);

export const mutation = graphql(`
  mutation PostDetail_bookmarkPost($input: BookmarkPostInput!) {
    bookmarkPost(input: $input) {
      post {
        ...PostDetail_Post
      }
    }
  }
`);

export function PostDetail({ id }: Props) {
  const { complete, data: post } = useFragment({
    fragment,
    fragmentName: "PostDetail_Post",
    from: {
      __typename: "Post",
      id,
    },
  });

  const [mutate] = useMutation(mutation, {});

  if (!complete) {
    return null;
  }

  return (
    <>
      <header>
        <h2>{post.title}</h2>
        <Avatar id={post.author.id} />
        <button
          onClick={() => {
            mutate({
              variables: {
                input: {
                  postId: id,
                  bookmarked: !post.bookmarked,
                },
              },
            });
          }}
        >
          {!post.bookmarked ? "Add bookmark" : "Delete bookmark"}
        </button>
      </header>
      <pre>{post.body}</pre>
    </>
  );
}
