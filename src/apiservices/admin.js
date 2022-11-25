import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  // authenticate: (admin) => {
  login: (admin) => {
    return axios.post(getUrl() + "login/", admin);
  },
  //recover
  resetPassword: (admin) => {
    return axios.post(getUrl() + "reset/", admin);
  },

  registerAdmin: (token, admin) => {
    return axios.post(getUrl() + "admin/", admin, {
      headers: {
        Authorization: token,
      },
    });
  },
  putAdmin: (token, id, admin) => {
    return axios.put(getUrl() + `admin/${id}`, admin, {
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
