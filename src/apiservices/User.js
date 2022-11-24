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
    return axios.put(getUrl() + "user/" + user.id, user);
  },

  deleteUser(user) {
    return axios.delete(getUrl() + "user/" + user.id, { data: user });
  },

  // authenticate: (user) => {
  authenticate: (user) => {
    return axios.post(getUrl() + "/user/login", user);
  },
  //recover
  resetPassword: (book) => {
    return axios.post(getUrl() + "/user/reset", book);
  },

  postAdmin: (token, user) => {
    return axios.post(getUrl() + "/user/admin", user, {
      headers: {
        Authorization: token,
      },
    });
  },
  putAdmin: (token, id, user) => {
    return axios.put(getUrl() + `/user/admin/${id}`, user, {
      headers: {
        Authorization: token,
      },
    });
  },
  deleteAdmin: (token, id) => {
    return axios.delete(getUrl() + `/user/admin/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
};
