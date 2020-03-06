import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance(url) {
  return axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
}

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const branches = createInstanceWithAuth('api');
export const accounts = createInstanceWithAuth('api');
export const companies = createInstanceWithAuth('api');
export const instance = createInstance('api');
