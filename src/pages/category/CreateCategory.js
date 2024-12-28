import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";

import { Alert } from "@mui/material";

function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createInfo, setCreateInfo] = useState({ status: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = {
        name,
        description,
      };
      await createCategory(newCategory);
      setCreateInfo({ status: true, message: "Category created successfully" });
    } catch (error) {
      console.error("Error creating category: " + error);
      if (error.response) {
        if (error.response.status === 401) {
          const message =
            error.response.data &&
            error.response.data.message === "Access Denied"
              ? "You do not have permission to perform this action."
              : "Please sign in to create category!";
          setCreateInfo({ status: false, message: message });
        } else {
          setCreateInfo({
            status: false,
            message:
              "An error occurred while trying to create category. Please try again.",
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
    <div style={{ padding: "1rem" }}>
      <h2>Create a new category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name (min 1 char)</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={1}
          />
        </div>
        <div>
          <label>Category Description (min 1 char)</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={1}
          />
        </div>
        <button type="submit">Create category</button>
      </form>
      {createInfo.message && (
        <Alert severity={createInfo.status ? "success" : "error"}>
          {createInfo.message}
        </Alert>
      )}
    </div>
  );
}

export default CreateCategory;
