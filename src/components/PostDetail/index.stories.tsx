import type { Meta, StoryObj } from "@storybook/react";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { createCachePreloader } from "@/support/storybook/apollo";
import { typeDefs } from "@/__generated__/typeDefs";
import {
  definePostFactory,
  defineBookmarkPostResultFactory,
  dynamic,
} from "@/__generated__/fabbrica";

import { UserFragmentFactory } from "../Avatar/index.stories";

import { PostDetail, fragment } from ".";

export const PostFragmentFactory = definePostFactory({
  defaultFields: {
    __typename: "Post",
    id: dynamic(({ seq }) => `post${seq}`),
    title: "Blog title",
    body: "blog body\nblog body",
    bookmarked: false,
    author: dynamic(async () => await UserFragmentFactory.build()),
  },
});

const BookmarkPostResultFactory =
  defineBookmarkPostResultFactory.withTransientFields({
    postId: "",
  })({
    defaultFields: {
      __typename: "BookmarkPostResult",
      post: dynamic(
        async ({ get }) =>
          await PostFragmentFactory.build({
            id: (await get("postId")) ?? "post",
          })
      ),
    },
  });

const meta = {
  title: "components/PostDetail",
  component: PostDetail,
  excludeStories: /Factory$/,
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "PostDetail_Post",
      data: PostFragmentFactory.build({
        id: "post001",
      }),
    })
    .toLoader(),
  args: {
    id: "post001",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Bookmarked = {
  loaders: createCachePreloader()
    .preloadFragment({
      fragment,
      fragmentName: "PostDetail_Post",
      data: PostFragmentFactory.build({
        id: "post001",
        bookmarked: true,
      }),
    })
    .toLoader(),
  parameters: {
    mockSchema: makeExecutableSchema({
      typeDefs,
      resolvers: {
        Mutation: {
          bookmarkPost: () =>
            BookmarkPostResultFactory.build({
              postId: "post001",
            }),
        },
      },
    }),
  },
} satisfies Story;
