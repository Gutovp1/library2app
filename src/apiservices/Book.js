import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "book");
  },

  createBook(book) {
    return axios.put(getUrl() + "book", book);
  },

  editBook(book) {
    return axios.put(getUrl() + "book", book);
  },

  deleteBook(book) {
    return axios.put(getUrl() + "book", { data: book });
  },
};
