import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5001/api/";
// axios.defaults.headers.common["Authorization"] =
// localStorage.getItem("adminJwt");
const instance = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("adminJwt"),
  },
});

export default instance;
