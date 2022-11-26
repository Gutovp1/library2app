import http from "./axiosConfig";

export default {
  getAll() {
    return http.get("user");
  },

  createUser(user) {
    return http.post("user", user);
  },

  editUser(user) {
    return http.put("user/" + user.id, user);
  },

  deleteUser(user) {
    return http.delete("user/" + user.id, { data: user });
  },
};
