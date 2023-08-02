const { gql } = require("graphql-tag");

module.exports = gql`
  extend type Query {
    hello: String!
  }
  extend type Mutation {
    createPost(inputPost: PostInput): Post!
  }
  type Post {
    _id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    image: String
  }
  input PostInput {
    title: String!
    content: String!
    image: String
  }
`;
