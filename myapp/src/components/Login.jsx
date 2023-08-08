import React, { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../redux/features/postActions";
import { useSelector } from "react-redux";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useLogin();
  const location = useLocation();
  const { error, users } = useSelector((state) => state.post);
  const path = location?.state?.pathname || "/";
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClick = async () => {
    login(data);
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {users?.message && <Navigate to={path} />}
      <input
        type="email"
        name="email"
        placeholder="Enter Title"
        value={data.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={data.password}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default Login;
