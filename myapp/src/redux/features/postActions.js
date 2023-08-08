import { useSelector, useDispatch } from "react-redux";
import { client } from "../../index";
import {
  CREATE_POST,
  GET_ALL_POSTS,
  LOGIN_USER,
} from "../../graphqlOperations/post";
import { setCreatedPost, setError, setPosts, setUser } from "./postSlice";
export default function usePost() {
  const postselector = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const getPosts = async () => {
    try {
      const res = await client.query({
        query: GET_ALL_POSTS,
      });

      dispatch(setPosts(res.data.getAllPost));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
  return {
    getPosts,
    postselector,
  };
}

export const useLogin = () => {
  const authselector = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const login = async (data) => {
    try {
      const res = await client.mutate({
        mutation: LOGIN_USER,
        variables: {
          loginInput: data,
        },
      });
      if (res.data.loginUser?.args) {
        dispatch(setError(res.data.loginUser?.message));
      } else {
        const res1 = dispatch(setUser(res.data?.loginUser));
        localStorage.setItem("token", res1.payload.token);
        console.log(res1);
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
  return {
    login,
    authselector,
  };
};

export const useCreatePostData = () => {
  const dispatch = useDispatch();
  const createPostData = async (data) => {
    try {
      const res = await client.mutate({
        mutation: CREATE_POST,
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        variables: {
          inputPost: data,
        },
      });

      const res1 = dispatch(setCreatedPost(res.data?.createPost));
      console.log(res1);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
  return {
    createPostData,
  };
};
