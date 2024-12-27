import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../../services/postService";

import { fetchAllCategories } from "../../services/categoryService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

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
      const updatedPost = {
        title,
        description,
        content,
        categoryId: Number(categoryId),
      };
      await updatePost(id, updatedPost);
      alert("Post updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
          />
        </div>
        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
        </div>
        <div>
          <label>Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <br />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
