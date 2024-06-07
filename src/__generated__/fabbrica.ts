import {
  type DefineTypeFactoryInterface,
  defineTypeFactory,
} from '@mizdra/graphql-codegen-typescript-fabbrica/helper';
import type {
  Maybe,
  BookmarkPostInput,
  BookmarkPostResult,
  Mutation,
  Post,
  Query,
  User,
} from '../gql/graphql';

export * from '@mizdra/graphql-codegen-typescript-fabbrica/helper';

export type OptionalBookmarkPostInput = {
  __typename?: 'BookmarkPostInput';
  postId?: BookmarkPostInput['postId'] | undefined;
  bookmarked?: BookmarkPostInput['bookmarked'] | undefined;
};

/**
 * Define factory for {@link BookmarkPostInput} model.
 *
 * @param options
 * @returns factory {@link BookmarkPostInputFactoryInterface}
 */
export const defineBookmarkPostInputFactory: DefineTypeFactoryInterface<
  OptionalBookmarkPostInput,
  {}
> = defineTypeFactory;

export type OptionalBookmarkPostResult = {
  __typename?: 'BookmarkPostResult';
  post?: OptionalPost | undefined;
};

/**
 * Define factory for {@link BookmarkPostResult} model.
 *
 * @param options
 * @returns factory {@link BookmarkPostResultFactoryInterface}
 */
export const defineBookmarkPostResultFactory: DefineTypeFactoryInterface<
  OptionalBookmarkPostResult,
  {}
> = defineTypeFactory;

export type OptionalMutation = {
  __typename?: 'Mutation';
  bookmarkPost?: Maybe<OptionalBookmarkPostResult> | undefined;
};

/**
 * Define factory for {@link Mutation} model.
 *
 * @param options
 * @returns factory {@link MutationFactoryInterface}
 */
export const defineMutationFactory: DefineTypeFactoryInterface<
  OptionalMutation,
  {}
> = defineTypeFactory;

export type OptionalPost = {
  __typename?: 'Post';
  id?: Post['id'] | undefined;
  title?: Post['title'] | undefined;
  description?: Post['description'] | undefined;
  body?: Post['body'] | undefined;
  author?: OptionalUser | undefined;
  bookmarked?: Post['bookmarked'] | undefined;
  createdAt?: Post['createdAt'] | undefined;
  updatedAt?: Post['updatedAt'] | undefined;
};

/**
 * Define factory for {@link Post} model.
 *
 * @param options
 * @returns factory {@link PostFactoryInterface}
 */
export const definePostFactory: DefineTypeFactoryInterface<
  OptionalPost,
  {}
> = defineTypeFactory;

export type OptionalQuery = {
  __typename?: 'Query';
  popularPosts?: OptionalPost[] | undefined;
  post?: Maybe<OptionalPost> | undefined;
};

/**
 * Define factory for {@link Query} model.
 *
 * @param options
 * @returns factory {@link QueryFactoryInterface}
 */
export const defineQueryFactory: DefineTypeFactoryInterface<
  OptionalQuery,
  {}
> = defineTypeFactory;

export type OptionalUser = {
  __typename?: 'User';
  id?: User['id'] | undefined;
  name?: User['name'] | undefined;
  avatarURL?: User['avatarURL'] | undefined;
  createdAt?: User['createdAt'] | undefined;
  updatedAt?: User['updatedAt'] | undefined;
};

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export const defineUserFactory: DefineTypeFactoryInterface<
  OptionalUser,
  {}
> = defineTypeFactory;


// FIXME suppress TS noUnusedLocals error
export type _M = Maybe<unknown>;