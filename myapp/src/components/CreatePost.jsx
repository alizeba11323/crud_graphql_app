import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostData } from "../redux/features/postActions";

function CreatePost() {
  const { createPostData } = useCreatePostData();
  const navigate = useNavigate();
  const [data, setData] = useState({ title: "", content: "" });
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClick = () => {
    createPostData(data);
    navigate("/");
  };
  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        value={data.title}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="content"
        placeholder="Enter Content"
        value={data.content}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleClick}>Add Post</button>
    </div>
  );
}

export default CreatePost;
