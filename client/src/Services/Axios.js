import axios from 'axios';
import { toast } from 'react-toastify';

import {
  getAccessTokenFromLocalStorage,
  getAdminAccessTokenFromLocalStorage,
} from './Helpers';

export const baseUrl = 'http://localhost:9000/api/v1';

const instance = axios.create({
  baseURL: baseUrl,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

instance.interceptors.request.use(
  function (config) {
    if (
      config.url.includes('register') ||
      config.url.includes('/login') ||
      config.url.includes('/user/verifyotp') ||
      config.url.includes('/sendmail') ||
      config.url.includes('/forgotpassword') ||
      config.url.includes('reset') ||
      config.url.includes('/user/verifyfpotp')
    ) {
      return config;
    } else if (
      config.url.includes('user') ||
      config.url.includes('room') ||
      config.url.includes('car') ||
      config.url.includes('givereview')
    ) {
      config.headers[
        'Authorization'
      ] = `Bearer ${getAccessTokenFromLocalStorage()}`;

      return config;
    } else if (
      config.url.includes('/admin') ||
      config.url.includes('/approvehotelreview')
    ) {
      config.headers[
        'Authorization'
      ] = `Bearer ${getAdminAccessTokenFromLocalStorage()}`;

      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const orginalRequest = error.config;
    if (error.response.status === 406) {
      toast.error('Please Login to continue');
      return setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export const doGet = (uri, params = {}) => instance.get(uri, params);
export const doPost = (uri, params = {}) => instance.post(uri, params);
export const doPut = (uri, params = {}, config) =>
  instance.put(uri, params, config);
export const doDelete = (uri, params = {}) => instance.delete(uri, params);
