import http from "./axiosConfig";

export default {
  login: (admin) => {
    return http.post("login/", admin);
  },
  resetPassword: (admin) => {
    return http.post("reset/", admin);
  },

  registerAdmin: (token, admin) => {
    return http.post("admin/", admin);
  },
  putAdmin: (token, admin) => {
    return http.put("admin/" + admin.id, admin);
  },
  deleteAdmin: (token, admin) => {
    return http.delete("admin/" + admin.id, { data: admin });
  },
};
