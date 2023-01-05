import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/api/",
  baseURL: " https://fancy-turkeys-add-191-251-91-200.loca.lt/api/",
  headers: {
    "Bypass-Tunnel-Reminder": "1",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("adminJwt"),
  },
});

export default instance;
