import { useFragment } from "@apollo/client";
import { graphql } from "@/gql";

export const fragment = graphql(`
  fragment Avatar_User on User {
    name
    avatarURL
  }
`);

export type Props = {
  readonly id: string;
};

export function Avatar({ id }: Props) {
  const { complete, data: user } = useFragment({
    fragment,
    fragmentName: "Avatar_User",
    from: {
      __typename: "User",
      id,
    },
  });

  if (!complete) return null;

  return (
    <>
      <img width={48} height={48} src={user.avatarURL} alt={user.name} />
    </>
  );
}
