import { defineUserFactory, dynamic } from "../../__generated__/fabbrica";

export const UserFragmentFactory = defineUserFactory({
  defaultFields: {
    __typename: "User",
    id: dynamic(({ seq }) => `user${seq}`),
    name: "John",
    createdAt: "2024-01-01",
  },
});
