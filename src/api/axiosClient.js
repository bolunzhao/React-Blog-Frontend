import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // Adjust as needed
});

// If you need a Bearer token for admin endpoints, you can add an interceptor here.
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default axiosClient;
