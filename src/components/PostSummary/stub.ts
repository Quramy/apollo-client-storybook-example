import { definePostFactory, dynamic } from "../../__generated__/fabbrica";

import { UserFragmentFactory } from "../User/stub";

export const PostFragmentFactory = definePostFactory({
  defaultFields: {
    __typename: "Post",
    title: dynamic(({ seq }) => `Awesome blog post ${seq}`),
    id: dynamic(({ seq }) => `post${seq}`),
    author: dynamic(async () => await UserFragmentFactory.build()),
  },
});
