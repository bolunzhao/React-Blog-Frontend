// CreateComment.js
import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { createComment } from "../../services/commentService";

import { jwtDecode } from "jwt-decode";

function CreateComment({ postId, onCommentCreated }) {
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);

  const [createInfo, setCreateInfo] = useState({ status: null, message: "" });

  let user = "";
  const token = localStorage.getItem("token");
  const jwtToken = token ? jwtDecode(token) : null;
  if (jwtToken) {
    user = jwtToken.sub;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!commentBody) return;
    setLoading(true);
    try {
      const newComment = await createComment(postId, {
        name: user,
        body: commentBody,
      });
      onCommentCreated(newComment); // Callback to update comment list in parent component
      setCommentBody(""); // Clear the input field after submission
      setCreateInfo({ status: true, message: "Comment created successfully" });
    } catch (error) {
      console.error("Error creating comment:", error);
      if (error.response) {
        if (error.response.status === 401) {
          const message =
            error.response.data &&
            error.response.data.message === "Access Denied"
              ? "You do not have permission to perform this action."
              : "Please sign in to comment!";
          setCreateInfo({ status: false, message: message });
        } else if (error.response.status === 400) {
          const message = error.response.data.body;
          setCreateInfo({ status: false, message: message });
        }
      }
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Write a comment..."
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        variant="outlined"
        size="small"
      />
      {createInfo.message && (
        <Box mt={2}>
          <Alert severity={createInfo.status ? "success" : "error"}>
            {createInfo.message}
          </Alert>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        disabled={loading}
      >
        Post Comment
      </Button>
    </Box>
  );
}

export default CreateComment;
