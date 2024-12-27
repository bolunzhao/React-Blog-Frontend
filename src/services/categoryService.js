import axiosClient from "../api/axiosClient";

// GET /api/v1/categories
export const fetchAllCategories = async () => {
  const response = await axiosClient.get("/categories");
  return response.data;
};

// GET /api/v1/categories/:id
export const fetchCategoryById = async (id) => {
  const response = await axiosClient.get(`/categories/${id}`);
  return response.data;
};

// POST /api/v1/categories
export const createCategory = async (categoryDto) => {
  const response = await axiosClient.post("/categories", categoryDto);
  return response.data;
};

// PUT /api/v1/categories/:id
export const updateCategory = async (id, categoryDto) => {
  const response = await axiosClient.put(`/categories/${id}`, categoryDto);
  return response.data; // Updated CategoryDto
};

// DELETE /api/v1/categories/:id
export const deleteCategory = async (id) => {
  await axiosClient.delete(`/categories/${id}`);
};
