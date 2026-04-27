import axios from "axios";

const API = "http://localhost:8080/customer-app";

export default {
  getAll: () => axios.get(`${API}/customers`),
  save: (data) => axios.post(`${API}/customers`, data),
  update: (id, data) => axios.put(`${API}/customers/${id}`, data),
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`${API}/upload`, formData);
  },
};