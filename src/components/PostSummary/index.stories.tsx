import type { Meta, StoryObj } from "@storybook/react";

import { definePostFactory, dynamic } from "../../__generated__/fabbrica";
import { createCachePreloader } from "../../support/storybook/apollo";

import { UserFragmentFactory } from "../Avatar/index.stories";

import { PostSummary, fragment } from ".";

// 1. Define fragment stub data facotry
export const PostFragmentFactory = definePostFactory.withTransientFields({
  authorName: "",
})({
  defaultFields: {
    __typename: "Post",
    title: dynamic(({ seq }) => `Awesome blog post ${seq}`),
    description: "description description",
    id: dynamic(({ seq }) => `post${seq}`),
    author: dynamic(
      async ({ get }) =>
        // 2. Re-use child Component's factory to build child fragment stub data
        await UserFragmentFactory.build({
          name: (await get("authorName")) || "John",
        })
    ),
  },
});

const meta = {
  title: "components/PostSummary",
  component: PostSummary,
  excludeStories: /Factory$/,
  // 3. Load fragment stub data into Apollo cache.
  // The cache instance will be provided via `preloadedCacheDecorator`, configured by Preview.tsx
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "PostSummary_Post",
      data: PostFragmentFactory.build({
        id: "post001",
        title: "Apollo Client with Storybook",
        authorName: "Quramy",
      }),
    })
    .toLoader(),
  args: {
    id: "post001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
