const { gql } = require("graphql-tag");

module.exports = gql`
  extend type Query {
    hello: String!
    getAllPost: [Post!]!
    getSinglePost(id: ID!): Post!
  }
  extend type Mutation {
    createPost(inputPost: PostInput): Post! @auth
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
