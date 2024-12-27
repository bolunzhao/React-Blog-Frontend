import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../services/categoryService";

function CreateCategory() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = {
        name,
        description,
      };
      await createCategory(newCategory);
      alert("Category created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating category: " + error);
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
    </div>
  );
}

export default CreateCategory;