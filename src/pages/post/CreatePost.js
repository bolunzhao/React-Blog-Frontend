import React, { useState, useEffect } from "react";
import { createPost } from "../../services/postService";

import { fetchAllCategories } from "../../services/categoryService";

function CreatePost() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [createInfo, setCreateInfo] = useState([]);

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
      setCreateInfo([1, "Post created successfully"]);
    } catch (error) {
      console.error("Error creating post: ", error);
      if (error.response) {
        // Check if the error is a 401 and adjust the message accordingly
        if (error.response.status === 401) {
          if (
            error.response.data &&
            error.response.data.message === "Access Denied"
          ) {
            setCreateInfo([
              0,
              "You do not have permission to perform this action.",
            ]);
          } else {
            setCreateInfo([0, "Please sign in to post!"]);
          }
        } else {
          setCreateInfo([
            0,
            "An error occurred while trying to post. Please try again.",
          ]);
        }
      } else {
        setCreateInfo([
          0,
          "Network error, please check your internet connection.",
        ]);
      }
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title (min 2 chars)</label>
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
          <label>Description (min 10 chars)</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
        </div>
        <div>
          <label>Content (not empty)</label>
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
        <button type="submit">Create Post</button>
      </form>
      {createInfo &&
        (createInfo[0] === 1 ? (
          <p style={{ color: 'green' }}>{createInfo[1]}</p>
        ) : (
          <p style={{ color: 'red' }}>{createInfo[1]}</p>
        ))}
    </div>
  );
}

export default CreatePost;
