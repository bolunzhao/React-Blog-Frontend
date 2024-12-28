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
        {/* Container that takes full viewport height in total */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Optional top bar */}
          <UserInfoBar />

          {/* Main content area grows to fill space. 
              We also add a bottom margin to avoid overlap with Navbar */}
          <div
            style={{
              // offset from the top bar
              marginTop: "60px",    // must match the height of UserInfoBar
              flex: 1,
              padding: "10px",
              marginBottom: "60px", // space for the fixed bottom Navbar
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<h1 style={{ color: "green" }}>Welcome to Allen's Blog!</h1>}
              />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/new" element={<CreatePost />} />
              <Route path="/posts/:id/edit" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/new" element={<CreateCategory />} />
            </Routes>
          </div>

          {/* Fixed (or sticky) bottom navbar */}
          <div style={{ flexShrink: 0 }}>
            <Navbar />
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
export default App;
