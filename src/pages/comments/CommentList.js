// CommentsList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteComment } from "../../services/commentService";

import {
  Box,
  List,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Container,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format, parseISO } from "date-fns";

function CommentsList({ postId, comments = [], onDelete, onEditComment  }) {

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(postId, commentId);
        alert("Comment deleted successfully");
        onDelete(commentId);
      } catch (error) {
        console.error("Error deleting comment:", error);
        if (error.response) {
            if (error.response.status === 401) {
              const message =
                error.response.data &&
                error.response.data.message === "Access Denied"
                  ? "You do not have permission to perform this action."
                  : "Please sign in to delete comment!";
              alert(message);
            }
          }
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Comments
      </Typography>
      <List>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 2 }}>
              <CardContent>
                <ListItemText primary={"Author: "+comment.name} secondary={comment.body} />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2, paddingLeft: "10px" }}>
                  <Typography variant="caption" color="text.secondary">
                    Created:{" "}
                    {format(parseISO(comment.createdTime), "yyyy-MM-dd HH:mm:ss")}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Updated:{" "}
                    {format(parseISO(comment.updatedTime), "yyyy-MM-dd HH:mm:ss")}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => onEditComment(comment)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(comment.id)}
                    color="error"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
              <Divider component="li" />
            </Card>
          ))
        ) : (
          <Typography>No comments yet</Typography>
        )}
      </List>
    </Container>
  );
}

export default CommentsList;
