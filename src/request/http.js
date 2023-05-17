import axios from 'axios';
import { BASE_URL } from '../config';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
