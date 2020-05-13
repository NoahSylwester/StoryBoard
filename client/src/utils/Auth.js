import axios from "axios";

export default {
    // Signup
    SignUp: function(newUserInformation) {
      return axios.post("/auth/register", newUserInformation);
    },
    // Login
    Login: function(credentials) {
      return axios.post("/auth/authenticate", credentials)
    },
     // Gets the User with the given id
    CheckCredentials: function() {
      const token = localStorage.getItem('token');
      return axios.post("/auth/check/user", {
        token,
      });
    },
    CheckAdminCredentials: function() {
      const token = localStorage.getItem('token');
      return axios.post("/auth/check/admin", {
        token,
      });
    },
};