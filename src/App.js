import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing post-related components
import PostList from "./pages/post/PostList";
import PostDetails from "./pages/post/PostDetails";
import CreatePost from "./pages/post/CreatePost";
import EditPost from "./pages/post/EditPost";

// New auth components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { UserProvider } from "./pages/auth/UserContext";

import CategoryList from "./pages/category/CategoryList";
import CreateCategory from "./pages/category/CreateCategory";

import Navbar from "./components/Navbar";
import UserInfoBar from "./components/UserInfoBar";

function App() {

  return (
    <UserProvider>
      <Router>
        <UserInfoBar />
        <Navbar />
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <h1 style={{ color: "green", margin: "20px" }}>
                Welcome to Allen's Blog!
              </h1>
            }
          />

          {/* Posts-related routes */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          {/* Auth-related routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Categories-related routes */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/new" element={<CreateCategory />} />

          {/* You can add a catch-all or 404 page if you want */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
