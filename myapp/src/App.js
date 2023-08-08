import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create_post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
