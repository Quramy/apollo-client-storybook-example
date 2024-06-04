import type { Meta, StoryObj } from "@storybook/react";

import {
  createCachePreloader,
  preloadedCacheDecorator,
} from "../../support/storybook/apollo";

import { User, fragment } from ".";
import { UserFragmentFactory } from "./stub";

const meta = {
  title: "components/User",
  component: User,
  decorators: [preloadedCacheDecorator],
  loaders: [
    createCachePreloader()
      .preloadFragment({
        fragment,
        fragmentName: "User_User",
        data: UserFragmentFactory.build({
          id: "user001",
          name: "Miles",
        }),
      })
      .toLoader(),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "user001",
  },
} satisfies Story;

export const LongName = {
  args: {
    id: "user001",
  },
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
