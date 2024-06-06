/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BookmarkPostInput = {
  bookmarked: Scalars['Boolean']['input'];
  postId: Scalars['ID']['input'];
};

export type BookmarkPostResult = {
  __typename?: 'BookmarkPostResult';
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkPost?: Maybe<BookmarkPostResult>;
};


export type MutationBookmarkPostArgs = {
  input: BookmarkPostInput;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  body: Scalars['String']['output'];
  bookmarked: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  popularPosts: Array<Post>;
  post?: Maybe<Post>;
};


export type QueryPostArgs = {
  postId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  avatarURL: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Avatar_UserFragment = { __typename?: 'User', name: string, avatarURL: string } & { ' $fragmentName'?: 'Avatar_UserFragment' };

export type PopularPosts_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularPosts_QueryQuery = { __typename?: 'Query', popularPosts: Array<(
    { __typename?: 'Post', id: string }
    & { ' $fragmentRefs'?: { 'PostSummary_PostFragment': PostSummary_PostFragment } }
  )> };

export type PostDetail_PostFragment = { __typename?: 'Post', id: string, title: string, body: string, bookmarked: boolean, author: (
    { __typename?: 'User', id: string, name: string }
    & { ' $fragmentRefs'?: { 'Avatar_UserFragment': Avatar_UserFragment } }
  ) } & { ' $fragmentName'?: 'PostDetail_PostFragment' };

export type PostDetail_BookmarkPostMutationVariables = Exact<{
  input: BookmarkPostInput;
}>;


export type PostDetail_BookmarkPostMutation = { __typename?: 'Mutation', bookmarkPost?: { __typename?: 'BookmarkPostResult', post: (
      { __typename?: 'Post' }
      & { ' $fragmentRefs'?: { 'PostDetail_PostFragment': PostDetail_PostFragment } }
    ) } | null };

export type PostSummary_PostFragment = { __typename?: 'Post', id: string, title: string, description: string, author: (
    { __typename?: 'User', id: string, name: string }
    & { ' $fragmentRefs'?: { 'Avatar_UserFragment': Avatar_UserFragment } }
  ) } & { ' $fragmentName'?: 'PostSummary_PostFragment' };

export const Avatar_UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}}]}}]} as unknown as DocumentNode<Avatar_UserFragment, unknown>;
export const PostDetail_PostFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetail_Post"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}}]}}]} as unknown as DocumentNode<PostDetail_PostFragment, unknown>;
export const PostSummary_PostFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostSummary_Post"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar_User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}}]}}]} as unknown as DocumentNode<PostSummary_PostFragment, unknown>;
export const PopularPosts_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PopularPosts_Query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostSummary_Post"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostSummary_Post"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar_User"}}]}}]}}]} as unknown as DocumentNode<PopularPosts_QueryQuery, PopularPosts_QueryQueryVariables>;
export const PostDetail_BookmarkPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostDetail_bookmarkPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkPostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmarkPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostDetail_Post"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Avatar_User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarURL"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostDetail_Post"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"bookmarked"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Avatar_User"}}]}}]}}]} as unknown as DocumentNode<PostDetail_BookmarkPostMutation, PostDetail_BookmarkPostMutationVariables>;