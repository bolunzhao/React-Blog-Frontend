import React, { useState } from "react";
import { createCategory } from "../../services/categoryService";
import { Alert, TextField, Button, Typography, Container, Box } from "@mui/material";


function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createInfo, setCreateInfo] = useState({ status: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = { name, description };
      await createCategory(newCategory);
      setCreateInfo({ status: true, message: "Category created successfully" });
    } catch (error) {
      console.error("Error creating category: " + error);
      let message = "Network error, please check your internet connection.";
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      setCreateInfo({ status: false, message });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create a new category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Category Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            inputProps={{ minLength: 1 }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Category Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            inputProps={{ minLength: 1 }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Create category
        </Button>
      </form>
      {createInfo.message && (
        <Box mt={2}>
          <Alert severity={createInfo.status ? "success" : "error"}>
            {createInfo.message}
          </Alert>
        </Box>
      )}
    </Container>
  );
}

export default CreateCategory;
