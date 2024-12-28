import React, { useState, useEffect } from "react";
import { createPost } from "../../services/postService";

import { fetchAllCategories } from "../../services/categoryService";

import {
  Alert,
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [createInfo, setCreateInfo] = useState({ status: null, message: "" });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
        if (data && data.length > 0) {
          setCategoryId(data[0].id.toString()); // Pre-select the first category by default
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the PostDto
      const newPost = {
        title,
        description,
        content,
        categoryId: Number(categoryId),
      };
      await createPost(newPost);
      setCreateInfo({ status: true, message: "Post created successfully" });
    } catch (error) {
      console.error("Error creating post: ", error);
      if (error.response) {
        if (error.response.status === 401) {
          const message =
            error.response.data &&
            error.response.data.message === "Access Denied"
              ? "You do not have permission to perform this action."
              : "Please sign in to post!";
          setCreateInfo({ status: false, message: message });
        } else {
          setCreateInfo({
            status: false,
            message:
              "An error occurred while trying to post. Please try again.",
          });
        }
      } else {
        setCreateInfo({
          status: false,
          message: "Network error, please check your internet connection.",
        });
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            inputProps={{ minLength: 2 }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            inputProps={{ minLength: 10 }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              label="Category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </form>
      {createInfo.message && (
        <Box mt={2}>
          <Alert severity={createInfo.status ? 'success' : 'error'}>
            {createInfo.message}
          </Alert>
        </Box>
      )}
    </Container>
  );
}

export default CreatePost;
