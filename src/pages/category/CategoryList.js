import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchAllCategories,
  deleteCategory,
} from "../../services/categoryService";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        alert("Category deleted successfully");
        loadCategories();
      } catch (error) {
        console.error(`Error deleting category ${id}`, error);
        if (error.response) {
          if (error.response.status === 401) {
            const message =
              error.response.data &&
              error.response.data.message === "Access Denied"
                ? "You do not have permission to perform this action."
                : "Please sign in to delete!";
            alert(message);
          }
        }
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Blog Categories
      </Typography>
      {categories ? (
        categories.map((c) => (
          <Card key={c.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {c.name}
              </Typography>
              <Typography color="text.secondary">{c.description}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleDelete(c.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Box>No category yet, please create one</Box>
      )}
    </Container>
  );
}

export default CategoryList;
