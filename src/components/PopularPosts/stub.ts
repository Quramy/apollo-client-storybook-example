import { defineQueryFactory, dynamic } from "../../__generated__/fabbrica";
import { PostFragmentFactory } from "../PostSummary/stub";

export const PopularPostsQueryFactory = defineQueryFactory({
  defaultFields: {
    __typename: "Query",
    popularPosts: dynamic(async () => await PostFragmentFactory.buildList(5)),
  },
});
