import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const API = {

  get(endpoint) {
    return axios.get(API_URL + endpoint);
  },

  post(endpoint, data) {
    return axios.post(API_URL + endpoint, data); 
  },

  put(endpoint, data) {
    return axios.put(API_URL + endpoint, data); 
  },
  
  delete(endpoint) {
    return axios.delete(API_URL + endpoint);
  }
};

export default API;
 
