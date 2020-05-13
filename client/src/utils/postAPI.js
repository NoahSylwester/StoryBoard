import axios from "axios";

export default {
    // Gets all Posts
    getPosts: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/posts", {
        headers: {'x-access-token': token},
      });
    },
    // Gets the Post with the given id
    getPost: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/posts/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the Post with the given id
    deletePost: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/posts/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a Post to the database
    savePost: function(postData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/posts", postData, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a reply to the database
    saveReply: function(id, postData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/posts/" + id, postData, {
        headers: {'x-access-token': token},
      });
    }
};