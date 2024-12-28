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
import { UserProvider, useUser } from './pages/auth/UserContext';
import Logout from './pages/auth/Logout';

import CategoryList from './pages/category/CategoryList';
import CreateCategory from './pages/category/CreateCategory';

function Navbar() {
  const { user } = useUser();

  return (
    <div style={{ background: '#eee', padding: '1rem' }}>
      {/* First row for navigation links */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div>
          <Link to="/">Home</Link> |{' '}
          <Link to="/categories">Categories</Link> |{' '}
          <Link to="/categories/new">Create Category</Link> |{' '}
          <Link to="/posts">Posts</Link> |{' '}
          <Link to="/posts/new">Create Post</Link>
        </div>
        <div>
          {user ? (
            <Logout />
          ) : (
            <>
              <Link to="/login">Login</Link> |{' '}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      {/* Second row for user information */}
      {user && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Hi, {user.username}!</span>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<h1 style={{ color: 'green', margin: '20px'}}>Welcome to Allen's Blog!</h1>} />

          {/* Posts-related routes */}
          <Route path="/posts" element={<PostList />}/>
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />

          {/* Auth-related routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Categories-related routes */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path='/categories/new' element={<CreateCategory />}/>

          {/* You can add a catch-all or 404 page if you want */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
