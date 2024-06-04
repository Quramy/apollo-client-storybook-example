import type { Meta, StoryObj } from "@storybook/react"

import { PopularPosts, query } from "."
import { PopularPostsQueryFactory } from "./stub"
import { mockLoadDecorator, mockFragmentLoader } from "../../support/storybook";

const meta = {
  title: "components/PopularPosts",
  component: PopularPosts,
  decorators: [mockLoadDecorator],
  loaders: [
    mockFragmentLoader(async () => {
      return {
        query,
        data: await PopularPostsQueryFactory.build(),
      };
    }),
  ],
} satisfies Meta

export default meta;

type Story = StoryObj<typeof meta>

export const Default = {
} satisfies Story;
