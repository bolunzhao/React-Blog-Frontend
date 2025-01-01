import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../services/postService";
import { fetchCategoryById } from "../../services/categoryService";

import { Typography, Container, CircularProgress, Paper } from "@mui/material";

import { format, parseISO } from "date-fns";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    loadPostAndCategory();
  }, []);

  const loadPostAndCategory = async () => {
    try {
      const data = await fetchPostById(id);
      setPost(data);
      if (data && data.categoryId) {
        loadCategory(data.categoryId);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const loadCategory = async (categoryId) => {
    try {
      const catData = await fetchCategoryById(categoryId); // Fetch the category details
      setCategory(catData);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  if (!post)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Post Details
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography paragraph>
          <strong>Description:</strong> {post.description}
        </Typography>
        <Typography paragraph>
          <strong>Content:</strong> {post.content}
        </Typography>
        <Typography paragraph>
          <strong>Category:</strong>{" "}
          {category ? category.name : <CircularProgress size={20} />}
        </Typography>
        <Typography position={"bottom"}>
          Created: {format(parseISO(post.createdTime), "yyyy-MM-dd HH:mm:ss")}{" "}
          Updated: {format(parseISO(post.updatedTime), 'yyyy-MM-dd HH:mm:ss')}
        </Typography>
        {/* If you want to display comments or other fields, access post.comments, etc. */}
      </Paper>
    </Container>
  );
}

export default PostDetails;
