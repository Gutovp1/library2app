import http from "./axiosConfig";

export default {
  getAll() {
    return http.get("rental");
  },

  createRental(rental) {
    return http.post("rental", rental);
  },

  editRental(rental) {
    return http.put("rental/" + rental.id, rental);
  },

  deleteRental(rental) {
    return http.delete("rental/" + rental.id, { data: rental });
  },
};
