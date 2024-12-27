import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../../services/postService";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchAllPosts();
      // data.content is an array of PostDto
      setPosts(data.content);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        alert("Post deleted successfully");
        loadPosts(); // Reload the list
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Blog Posts</h2>
      {posts.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <Link to={`/posts/${p.id}`}>View Details</Link> |{" "}
          <Link to={`/posts/${p.id}/edit`}>Edit</Link> |{" "}
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
