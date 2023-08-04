const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    name: String!
    avatarImage: String
    createdAt: String!
    updatedAt: String!
  }
  type UserErrorResponse {
    message: String!
    args: String!
  }
  type UserRegisterResponse {
    message: String!
    token: String!
    user: User!
  }
  union UserResult = UserRegisterResponse | UserErrorResponse
  input UserInput {
    name: String!
    email: String!
    password: String!
    avatarImage: String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  extend type Mutation {
    registerUser(userInput: UserInput!): UserResult!
    loginUser(loginInput: LoginInput!): UserResult!
  }
`;
