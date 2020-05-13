import axios from "axios";

const APIObj = (dataType) => {
    return {
        [`delete${dataType[0].toUpperCase() + dataType.slice(1, dataType.length)}`]: function(id) {
            const token = localStorage.getItem('token');
            return axios.delete(`/admin/${dataType}/${id}`, {
                headers: {'x-access-token': token},
            });
        },
        [`update${dataType[0].toUpperCase() + dataType.slice(1, dataType.length)}`]: function(id, updateData) {
            const token = localStorage.getItem('token');
            return axios.put(`/admin/${dataType}/${id}`, updateData, {
                headers: {'x-access-token': token},
            });
        }
    }
}

export default {
    getEvents: () => {
        const token = localStorage.getItem('token');
        return axios.get("/admin/events", {
          headers: {'x-access-token': token},
        });
    },
    searchEvents: function(searchData) {
        const token = localStorage.getItem('token');
        return axios.post("/admin/events/search", searchData, {
            headers: {'x-access-token': token},
        });
    },
    ...APIObj('thread'),
    ...APIObj('snippet'),
    ...APIObj('event'),
    ...APIObj('user'),
    ...APIObj('post'),
    ...APIObj('topic'),
    saveInfo: function () {
        console.log('to be created');
    },
};