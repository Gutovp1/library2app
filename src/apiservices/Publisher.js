import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "publisher");
  },

  createPublisher(publisher) {
    return axios.put(getUrl() + "publisher", publisher);
  },

  editPublisher(publisher) {
    return axios.put(getUrl() + "publisher", publisher);
  },

  deletePublisher(publisher) {
    return axios.put(getUrl() + "publisher", { data: publisher });
  },
};
