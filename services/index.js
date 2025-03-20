import axios from 'axios';

const Base_URL = axios.create({
  // baseURL: 'https://www.qoyn.network/api/',
  baseURL: 'http://localhost:3000/api/',
});

export default Base_URL;
