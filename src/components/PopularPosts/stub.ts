import { defineQueryFactory, dynamic } from "../../__generated__/fabbrica";
import { PostFragmentFactory } from "../PostSummary/stub";

export const PopularPostsQueryFactory = defineQueryFactory.withTransientFields({
  postsCount: 5,
})({
  defaultFields: {
    __typename: "Query",
    popularPosts: dynamic(async ({ get }) =>
      PostFragmentFactory.buildList((await get("postsCount")) ?? 5)
    ),
  },
});
