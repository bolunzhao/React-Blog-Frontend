import React, { useState } from "react";
import { Dialog, TextField, Button, Box, Alert } from "@mui/material";
import { updateComment } from "../../services/commentService";

function EditComment({ comment, open, onClose, onCommentUpdated, postId }) {
  const [body, setBody] = useState(comment.body);

  const [createInfo, setCreateInfo] = useState({ status: null, message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      comment.body = body;
      const updatedComment = await updateComment(postId, comment.id, comment);
      // Notify the parent with the updated comment
      onCommentUpdated(updatedComment);
      setCreateInfo({ status: true, message: "Comment updated successfully" });
    } catch (error) {
      console.error("Error updating comment:", error);
      if (error.response) {
        if (error.response.status === 401) {
          const message =
            error.response.data &&
            error.response.data.message === "Access Denied"
              ? "You do not have permission to perform this action."
              : "Please sign in to update comment!";
          setCreateInfo({ status: false, message: message });
        } else if (error.response.status === 400) {
          const message = error.response.data.body;
          setCreateInfo({ status: false, message: message });
        }
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          minWidth: "500px",
          minHeight: "180px",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          label="Edit Comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={3}
        />
        {createInfo.message && (
          <Box mt={2}>
            <Alert severity={createInfo.status ? "success" : "error"}>
              {createInfo.message}
            </Alert>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="text" onClick={onClose} sx={{ ml: 1 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default EditComment;
