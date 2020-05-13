import axios from "axios";

export default {
    // Gets all Users
    getUsers: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/users", {
        headers: {'x-access-token': token},
      });
    },
    // Gets the User with the given id
    getUser: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/users/" + id, {
        headers: {'x-access-token': token},
      });
    },
    searchUsers: function(searchData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/users/search", searchData, {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the User with the given id
    deleteUser: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/users/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a User to the database
    saveUser: function(userData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/users", userData, {
        headers: {'x-access-token': token},
      });
    }
};