import type { Meta, StoryObj } from "@storybook/react";

import {
  createCachePreloader,
  preloadedCacheDecorator,
} from "../../support/storybook/apollo";

import { PopularPosts, query } from ".";
import { PopularPostsQueryFactory } from "./stub";

const meta = {
  title: "components/PopularPosts",
  component: PopularPosts,
  decorators: [preloadedCacheDecorator],
  loaders: [
    createCachePreloader()
      .preloadQuery({
        query,
        data: PopularPostsQueryFactory.build(),
      })
      .toLoader(),
  ],
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
