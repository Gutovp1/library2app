import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "publisher");
  },

  getPublisher(publisher) {
    return axios.get(getUrl() + "publisher/" + publisher.id);
  },

  createPublisher(publisher) {
    return axios.post(getUrl() + "publisher", publisher);
  },

  editPublisher(publisher) {
    return axios.put(getUrl() + "publisher/" + publisher.id, publisher);
  },

  deletePublisher(publisher) {
    return axios.delete(getUrl() + "publisher/" + publisher.id, {
      data: publisher,
    });
  },
};
