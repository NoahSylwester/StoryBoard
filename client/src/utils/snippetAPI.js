import axios from "axios";

export default {
    // Gets all snippets
    getSnippets: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/snippets", {
        headers: {'x-access-token': token},
      });
    },
    searchSnippets: function(searchData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/snippets/search", searchData, {
        headers: {'x-access-token': token},
      });
    },
    // Gets the Snippet with the given id
    getSnippet: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/snippets/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the Snippet with the given id
    deleteSnippet: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/snippets/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a Snippet to the database
    saveSnippet: function(snippetData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/snippets", snippetData, {
        headers: {'x-access-token': token},
      });
    },
    updateSnippetImage: function(id, updateData, config) {
      const token = localStorage.getItem('token');
      return fetch(`/api/snippets/image/${id}`, { ...config, body: updateData, method: "PUT", headers: {'x-access-token': token}});
    },
};
