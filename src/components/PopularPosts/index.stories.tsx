import type { Meta, StoryObj } from "@storybook/react";

import { defineQueryFactory, dynamic } from "../../__generated__/fabbrica";
import { createCachePreloader } from "../../support/storybook/apollo";

import { PostFragmentFactory } from "../PostSummary/index.stories";
import { PopularPosts, query } from ".";

export const PopularPostsQueryFactory = defineQueryFactory.withTransientFields({
  postsCount: 5,
})({
  defaultFields: {
    __typename: "Query",
    popularPosts: dynamic(async ({ get }) =>
      PostFragmentFactory.buildList((await get("postsCount")) ?? 5)
    ),
  },
});

const meta = {
  title: "components/PopularPosts",
  component: PopularPosts,
  excludeStories: /Factory$/,
  loaders: createCachePreloader()
    .preloadQuery({
      query,
      data: PopularPostsQueryFactory.build(),
    })
    .toLoader(),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Empty = {
  loaders: [
    createCachePreloader()
      .preloadQuery({
        query,
        data: PopularPostsQueryFactory.build({
          postsCount: 0,
        }),
      })
      .toLoader(),
  ],
} satisfies Story;
