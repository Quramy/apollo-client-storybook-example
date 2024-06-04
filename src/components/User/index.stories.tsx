import type { Meta, StoryObj } from "@storybook/react";

import { createCachePreloader } from "../../support/storybook/apollo";

import { User, fragment } from ".";
import { UserFragmentFactory } from "./stub";

const meta = {
  title: "components/User",
  component: User,
  loaders: [
    createCachePreloader()
      .preloadFragment({
        fragment,
        fragmentName: "User_User",
        data: UserFragmentFactory.build({ id: "user001" }),
      })
      .toLoader(),
  ],
  args: {
    id: "user001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const LongName = {
  loaders: [
    createCachePreloader()
      .preloadFragment({
        fragment,
        fragmentName: "User_User",
        data: UserFragmentFactory.build({
          id: "user001",
          name: "Loooong name",
        }),
      })
      .toLoader(),
  ],
} satisfies Story;

export const Incomplelete = {
  args: {
    id: "user002",
  },
} satisfies Story;
