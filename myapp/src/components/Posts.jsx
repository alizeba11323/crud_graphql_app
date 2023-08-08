import { useEffect } from "react";
import usePost from "../redux/features/postActions";
import Post from "./Post";

function Posts() {
  const { getPosts, postselector } = usePost();
  const { posts, loading, error } = postselector;
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      {posts.length > 0 ? (
        <>
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
      ) : (
        <>
          <p>No Post Available</p>
        </>
      )}
    </div>
  );
}

export default Posts;
