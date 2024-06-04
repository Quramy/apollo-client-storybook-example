import type { Meta, StoryObj } from "@storybook/react";

import { createCachePreloader } from "../../support/storybook/apollo";

import { PostSummary, fragment } from ".";
import { PostFragmentFactory } from "./stub";

const meta = {
  title: "components/PostSummary",
  component: PostSummary,
  loaders: [
    createCachePreloader()
      .preloadFragment({
        fragment,
        fragmentName: "PostSummary_Post",
        data: PostFragmentFactory.build({
          id: "post001",
          title: "Apollo Client with Storybook",
        }),
      })
      .toLoader(),
  ],
  args: {
    id: "post001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
