import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../../services/postService";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
        if(error.response){
          if (error.response.status === 401) {
            const message =
              error.response.data &&
              error.response.data.message === "Access Denied"
                ? "You do not have permission to perform this action."
                : "Please sign in to delete post!";
            alert(message);
          }
        }
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Blog Posts
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography color="text.secondary">{post.description}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              component={Link}
              to={`/posts/${post.id}`}
              aria-label="view"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              component={Link}
              to={`/posts/${post.id}/edit`}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(post.id)}
              color="error"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default PostList;
