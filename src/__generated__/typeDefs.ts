export const typeDefs = /* GraphQL */ `
input BookmarkPostInput {
  bookmarked: Boolean!
  postId: ID!
}

type BookmarkPostResult {
  post: Post!
}

type Mutation {
  bookmarkPost(input: BookmarkPostInput!): BookmarkPostResult
}

type Post {
  author: User!
  body: String!
  bookmarked: Boolean!
  createdAt: String!
  description: String!
  id: ID!
  title: String!
  updatedAt: String!
}

type Query {
  popularPosts: [Post!]!
  post(postId: ID!): Post
}

type User {
  avatarURL: String!
  createdAt: String!
  id: ID!
  name: String!
  updatedAt: String!
}
`;