import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Blog Categories</h2>
      {categories.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <h4>{c.name}</h4>
          <p>{c.description}</p>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
