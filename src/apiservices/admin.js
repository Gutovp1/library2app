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
  login: (user) => {
    return axios.post(getUrl() + "login/", user);
  },
  //recover
  resetPassword: (user) => {
    return axios.post(getUrl() + "reset/", user);
  },

  registerAdmin: (token, user) => {
    return axios.post(getUrl() + "admin/", user, {
      headers: {
        Authorization: token,
      },
    });
  },
  putAdmin: (token, id, user) => {
    return axios.put(getUrl() + `admin/${id}`, user, {
      headers: {
        Authorization: token,
      },
    });
  },
  deleteAdmin: (token, id) => {
    return axios.delete(getUrl() + `admin/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
};
