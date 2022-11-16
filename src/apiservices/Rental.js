import axios from "axios";

const getUrl = () => {
  return "http://localhost:5001/api/";
};

export default {
  getAll() {
    return axios.get(getUrl() + "rental");
  },

  createRental(rental) {
    return axios.put(getUrl() + "rental", rental);
  },

  editRental(rental) {
    return axios.put(getUrl() + "rental", rental);
  },

  deleteRental(rental) {
    return axios.put(getUrl() + "rental", { data: rental });
  },
};