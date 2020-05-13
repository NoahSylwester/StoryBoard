import axios from "axios";

export default {
    // Gets all Threads
    getThreads: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/threads/", {
        headers: {'x-access-token': token},
      });
    },
    searchThreads: function(searchData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/threads/search", searchData, {
        headers: {'x-access-token': token},
      });
    },
    // Gets the Thread with the given id
    getThread: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/threads/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Gets latest-updated threads
    getLatestThreads: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/threads/latest", {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the Thread with the given id
    deleteThread: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/threads/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a Thread to the database
    saveThread: function(threadData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/threads", threadData, {
        headers: {'x-access-token': token},
      });
    }
};