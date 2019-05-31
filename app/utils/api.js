import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.157:5000/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
