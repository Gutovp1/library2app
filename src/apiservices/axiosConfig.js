import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/api/",
  // baseURL: "https://nice-hotels-warn-177-24-157-123.loca.lt/api/",
  // baseURL: "https://2nrrqslkbj.execute-api.sa-east-1.amazonaws.com/api/",
  headers: {
    // "Access-Control-Allow-Headers":
    //   "Content-Type,X-Amz-Date,X-Amz-Security-Token,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    "Bypass-Tunnel-Reminder": "1",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("adminJwt"),
  },
});

export default instance;
