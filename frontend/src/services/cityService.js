import axios from "axios";

export default {
  getAll: () => axios.get("http://localhost:8080/customer-app/cities"),
};