import {
  type DefineTypeFactoryInterface,
  defineTypeFactory,
} from '@mizdra/graphql-codegen-typescript-fabbrica/helper';
import type {
  Maybe,
  Post,
  Query,
  User,
} from './types';

export * from '@mizdra/graphql-codegen-typescript-fabbrica/helper';

export type OptionalPost = {
  __typename?: 'Post';
  id?: Post['id'] | undefined;
  title?: Post['title'] | undefined;
  body?: Post['body'] | undefined;
  author?: OptionalUser | undefined;
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

