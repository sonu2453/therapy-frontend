// src/utils/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://a653-2401-4900-8823-55f2-847e-7634-500e-9f48.ngrok-free.app';

axios.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
  }
  return config;
});
