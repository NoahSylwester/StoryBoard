import axios from "axios";

export default {
    // Gets all Events
    getEvents: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/events", {
        headers: {'x-access-token': token},
      });
    },
    searchEvents: function(searchData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/events/search", searchData, {
        headers: {'x-access-token': token},
      });
    },
    // Gets the Event with the given id
    getEvent: function(id) {
      const token = localStorage.getItem('token');
      return axios.get("/api/events/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Gets soonest events
    getSoonestEvents: function() {
      const token = localStorage.getItem('token');
      return axios.get("/api/events/soonest", {
        headers: {'x-access-token': token},
      });
    },
    // Deletes the Event with the given id
    deleteEvent: function(id) {
      const token = localStorage.getItem('token');
      return axios.delete("/api/events/" + id, {
        headers: {'x-access-token': token},
      });
    },
    // Saves a Event to the database
    saveEvent: function(EventData) {
      const token = localStorage.getItem('token');
      return axios.post("/api/events", EventData, {
        headers: {'x-access-token': token},
      });
    }
};