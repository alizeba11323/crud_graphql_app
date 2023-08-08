import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: "",
  loading: false,
  users: null,
};

const PostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.error = "";
      state.users = action.payload;
    },
    setCreatedPost: (state, action) => {
      console.log(state.posts);
      state.posts.push(action.payload);
      console.log(state.posts);
    },
  },
});

export const { setPosts, setError, setLoading, setUser, setCreatedPost } =
  PostSlice.actions;
export default PostSlice.reducer;
