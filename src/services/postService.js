import axiosClient from '../api/axiosClient';

// GET /api/v1/posts?pageNo=?&pageSize=?...
export const fetchAllPosts = async () => {
  const response = await axiosClient.get('/posts');
  // response.data is of type PostResponse { content, pageNo, pageSize, ... }
  return response.data;
};

// GET /api/v1/posts/:id
export const fetchPostById = async (id) => {
  const response = await axiosClient.get(`/posts/${id}`);
  return response.data; // A single PostDto
};

// POST /api/v1/posts
export const createPost = async (postDto) => {
  const response = await axiosClient.post('/posts', postDto);
  return response.data; // Created PostDto
};

// PUT /api/v1/posts/:id
export const updatePost = async (id, postDto) => {
  const response = await axiosClient.put(`/posts/${id}`, postDto);
  return response.data; // Updated PostDto
};

// DELETE /api/v1/posts/:id
export const deletePost = async (id) => {
  await axiosClient.delete(`/posts/${id}`);
};
