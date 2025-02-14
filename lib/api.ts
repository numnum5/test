import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-3-25-64-140.ap-southeast-2.compute.amazonaws.com:5000/api",
  headers: { "Content-Type": "application/json" }
});


export default api;
