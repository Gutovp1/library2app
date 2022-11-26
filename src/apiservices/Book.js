import http from "./axiosConfig";

export default {
  getAll() {
    return http.get("book");
  },
  getAvailable() {
    return http.get("book/available");
  },

  createBook(book) {
    return http.post("book", book);
  },

  editBook(book) {
    return http.put("book/" + book.id, book);
  },

  deleteBook(book) {
    return http.delete("book/" + book.id, { data: book });
  },
};
