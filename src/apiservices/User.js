import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "user");
  },

  createUser(user) {
    return axios.post(getUrl() + "user", user);
  },

  editUser(user) {
    return axios.put(getUrl() + "user", user);
  },

  deleteUser(user) {
    return axios.delete(getUrl() + "user", { data: user });
  },
};
