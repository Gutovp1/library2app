import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "publisher");
  },

  createPublisher(publisher) {
    return axios.post(getUrl() + "publisher/create", publisher);
  },

  editPublisher(publisher) {
    return axios.put(getUrl() + "publisher/edit", publisher);
  },

  deletePublisher(publisher) {
    return axios.delete(getUrl() + "publisher/delete", { data: publisher });
  },
};
