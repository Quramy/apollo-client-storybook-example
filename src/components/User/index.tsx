import { graphql } from "../../gql";

import { useFragment } from "@apollo/client";

export const fragment = graphql(`
  fragment User_User on User {
    id
    name
    createdAt
  }
`);

export type Props = {
  readonly id: string;
};

export function User({ id }: Props) {
  const { complete, data } = useFragment({
    fragment,
    fragmentName: "User_User",
    from: {
      __typename: "User",
      id,
    },
  });

  if (!complete) return null;

  return (
    <div>
      <span>{data.name}</span>&nbsp;
      <span>(from {data.createdAt})</span>
    </div>
  );
}
