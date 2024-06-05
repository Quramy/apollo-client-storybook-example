import type { Meta, StoryObj } from "@storybook/react";

import { createCachePreloader } from "../../support/storybook/apollo";
import { defineUserFactory, dynamic } from "../../__generated__/fabbrica";

import { User, fragment } from ".";

export const UserFragmentFactory = defineUserFactory({
  defaultFields: {
    __typename: "User",
    id: dynamic(({ seq }) => `user${seq}`),
    name: "John",
    createdAt: "2024-01-01",
  },
});

const meta = {
  title: "components/User",
  component: User,
  excludeStories: /Factory$/,
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "User_User",
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

export const LongName = {
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "User_User",
      data: UserFragmentFactory.build({
        id: "user001",
        name: "Loooong name",
      }),
    })
    .toLoader(),
} satisfies Story;

export const Incomplelete = {
  args: {
    id: "user002",
  },
} satisfies Story;
