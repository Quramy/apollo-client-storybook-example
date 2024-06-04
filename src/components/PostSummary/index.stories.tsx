import type { Meta, StoryObj } from "@storybook/react";

import { PostSummary, fragment } from ".";
import { mockLoadDecorator, mockFragmentLoader } from "../../support/storybook";
import { PostFragmentFactory } from "./stub";

const meta = {
  title: "components/PostSummary",
  component: PostSummary,
  decorators: [mockLoadDecorator],
  loaders: [
    mockFragmentLoader(async () => ({
      fragment,
      fragmentName: "PostSummary_Post",
      data: await PostFragmentFactory.build({
        id: "post001",
        title: "Apollo Client with Storybook",
      }),
    })),
  ],
  args: {
    id: "post001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
