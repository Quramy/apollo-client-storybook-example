import type { Meta, StoryObj } from "@storybook/react";

import { User, fragment } from ".";
import { UserFragmentFactory } from "./stub";
import { mockLoadDecorator, mockFragmentLoader } from "../../support/storybook";

const meta = {
  title: "components/User",
  component: User,
  loaders: [
    mockFragmentLoader(async () => ({
      fragment,
      fragmentName: "User_User",
      data: await UserFragmentFactory.build({
        id: "user001",
        name: "Miles",
      }),
    })),
  ],
  decorators: [mockLoadDecorator],
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
    mockFragmentLoader(async () => ({
      fragment,
      fragmentName: "User_User",
      data: await UserFragmentFactory.build({
        id: "user001",
        name: "Loooooooong name",
      }),
    })),
  ],
} satisfies Story;

export const Incomplelete = {
  args: {
    id: "user002",
  },
} satisfies Story;
