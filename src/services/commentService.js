import axiosClient from '../api/axiosClient';

// POST /api/v1/posts/:postId/comments
export const createComment = async (postId, commentDto) => {
    const response = await axiosClient.post(`/posts/${postId}/comments`, commentDto);
    return response.data; // Created CommentDto
};

// GET /api/v1/posts/:postId/comments
export const fetchCommentsByPostId = async (postId) => {
    const response = await axiosClient.get(`/posts/${postId}/comments`);
    return response.data; // Array of CommentDto
};

// GET /api/v1/posts/:postId/comments/:commentId
export const fetchCommentById = async (postId, commentId) => {
    const response = await axiosClient.get(`/posts/${postId}/comments/${commentId}`);
    return response.data; // Single CommentDto
};

// PUT /api/v1/posts/:postId/comments/:commentId
export const updateComment = async (postId, commentId, commentDto) => {
    const response = await axiosClient.put(`/posts/${postId}/comments/${commentId}`, commentDto);
    return response.data; // Updated CommentDto
};

// DELETE /api/v1/posts/:postId/comments/:commentId
export const deleteComment = async (postId, commentId) => {
    await axiosClient.delete(`/posts/${postId}/comments/${commentId}`);
    return 'Comment deleted successfully'; // Assuming no response body, just a success message
};
