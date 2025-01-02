import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../../services/postService";

import { fetchAllCategories } from "../../services/categoryService";

import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Alert,
} from "@mui/material";

function EditPost() {
  const { id } = useParams();

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
        setCategories(data); // Adjust depending on the actual structure of the response
        if (data && data.length > 0) {
          setCategoryId(data[0].id.toString()); // Pre-select the first category by default
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const data = await fetchPostById(id);
      setTitle(data.title);
      setDescription(data.description);
      setContent(data.content);
      setCategoryId(data.categoryId || "");
    } catch (error) {
      console.error("Error loading post for edit:", error);
    }
  };

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
      await updatePost(categoryId, newPost);
      setCreateInfo({ status: true, message: "Post updated successfully" });
    } catch (error) {
      console.error("Error creating post: ", error);
      if (error.response) {
        if (error.response.status === 401) {
          const message =
            error.response.data &&
            error.response.data.message === "Access Denied"
              ? "You do not have permission to perform this action."
              : "Please sign in to update post!";
          setCreateInfo({ status: false, message: message });
        } else {
          setCreateInfo({
            status: false,
            message:
              "An error occurred while trying to update post. Please try again.",
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
        Edit Post
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
        {createInfo.message && (
          <Box mb={2}>
            <Alert severity={createInfo.status ? "success" : "error"}>
              {createInfo.message}
            </Alert>
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary">
          Update Post
        </Button>
      </form>
    </Container>
  );
}

export default EditPost;
