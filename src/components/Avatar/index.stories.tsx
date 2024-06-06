import type { Meta, StoryObj } from "@storybook/react";

import { createCachePreloader } from "../../support/storybook/apollo";
import { defineUserFactory, dynamic } from "../../__generated__/fabbrica";

import { Avatar, fragment } from ".";

export const UserFragmentFactory = defineUserFactory({
  defaultFields: {
    __typename: "User",
    id: dynamic(({ seq }) => `user${seq}`),
    name: "John",
    avatarURL: "https://fakeimg.pl/48x48/23cd6b/fff",
  },
});

const meta = {
  title: "components/Avatar",
  component: Avatar,
  excludeStories: /Factory$/,
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "Avatar_User",
      data: UserFragmentFactory.build({ id: "user001" }),
    })
    .toLoader(),
  args: {
    id: "user001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Incomplelete = {
  args: {
    id: "user002",
  },
} satisfies Story;
