import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Existing post-related components
import PostList from './pages/post/PostList';
import PostDetails from './pages/post/PostDetails';
import CreatePost from './pages/post/CreatePost';
import EditPost from './pages/post/EditPost';

// New auth components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import CategoryList from './pages/category/CategoryList'

function App() {
  return (
    <Router>
      {/* Simple Navbar */}
      <nav style={{ background: '#eee', padding: '1rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/categories">Categories</Link> |{' '}
        <Link to="/posts/new">Create Post</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        {/* Posts-related routes */}
        <Route path="/" element={<PostList />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        {/* Auth-related routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Categories-related routes */}
        <Route path="/categories" element={<CategoryList />} />

        {/* You can add a catch-all or 404 page if you want */}
      </Routes>
    </Router>
  );
}

export default App;
