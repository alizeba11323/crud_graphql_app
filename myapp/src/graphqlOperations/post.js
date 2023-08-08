import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query Get_All_Post {
    getAllPost {
      _id
      content
      title
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query Single_POST($getSinglePostId: ID!) {
    getSinglePost(id: $getSinglePostId) {
      title
      content
      _id
    }
  }
`;
export const CREATE_POST = gql`
  mutation CreatePost($inputPost: PostInput) {
    createPost(inputPost: $inputPost) {
      content
      title
      _id
    }
  }
`;
export const LOGIN_USER = gql`
  mutation LOGIN_USER($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      ... on UserErrorResponse {
        message
        args
      }
      ... on UserRegisterResponse {
        message
        token
        user {
          name
          email
          avatarImage
        }
      }
    }
  }
`;
