import axios from "axios";
const apiHelper = axios.create({
  baseURL: "http://localhost:5000", // Your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiHelper;
