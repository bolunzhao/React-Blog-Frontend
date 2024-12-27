// Example using your existing axiosClient
import axiosClient from '../api/axiosClient';

export const login = async (usernameOrEmail, password) => {
  const response = await axiosClient.post('/auth/login', { usernameOrEmail, password });
  return response.data;
};

export const registerUser = async (name, username, email, password) => {
  const response = await axiosClient.post('/auth/register', { name, username, email, password });
  return response.data;
};
