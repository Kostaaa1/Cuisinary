import a from 'axios';

const { MODE, VITE_PROD_SERVER_URL, VITE_DEV_SERVER_URL } = import.meta.env;
const API_URL = `${MODE === 'production' ? VITE_PROD_SERVER_URL : VITE_DEV_SERVER_URL}`;

const axios = a.create({
  baseURL: API_URL,
});

export default axios;
