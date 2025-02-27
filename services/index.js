import axios from 'axios';

const Base_URL = axios.create({
  baseURL: 'https://www.qoyn.network/api/',
});

export default Base_URL;
