import axios from "axios";

export default {
    // Gets all Topics
    getTopics: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/topics", {
        headers: {'x-access-token': token},
      });
    },
    // Gets the Topic with the given id
    getTopic: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/topics/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the Topic with the given id
    deleteTopic: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/topics/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a Topic to the database
    saveTopic: function(TopicData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/topics", TopicData, {
        headers: {'x-access-token': token},
      });
    }
};