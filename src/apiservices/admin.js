import http from "./axiosConfig";

export default {
  login: (admin) => {
    return http.post("login/", admin);
  },
  // resetPassword: (admin) => {
  //   return http.post("reset/", admin);
  // },

  registerAdmin: (token, admin) => {
    return http.post("admin/", admin);
  },
};
