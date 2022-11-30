import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5001/api/";
// axios.defaults.headers.common["Authorization"] =
// localStorage.getItem("adminJwt");
const instance = axios.create({
  // baseURL: "https://library-livre-api.azurewebsites.net/",
  // baseURL: "http://localhost:5001/api/",
  baseURL: "https://little-gifts-switch-177-24-156-179.loca.lt/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("adminJwt"),
  },
});

export default instance;
