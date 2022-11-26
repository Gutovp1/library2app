import http from "./axiosConfig";

export default {
  getAll() {
    return http.get("publisher");
  },

  getPublisher(publisher) {
    return http.get("publisher/" + publisher.id);
  },

  createPublisher(publisher) {
    return http.post("publisher", publisher);
  },

  editPublisher(publisher) {
    return http.put("publisher/" + publisher.id, publisher);
  },

  deletePublisher(publisher) {
    return http.delete("publisher/" + publisher.id, {
      data: publisher,
    });
  },
};
