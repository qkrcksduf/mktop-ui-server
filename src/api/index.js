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

export const devices = createInstanceWithAuth('/devices');
export const branches = createInstanceWithAuth('/branches');
export const accounts = createInstanceWithAuth('/accounts');
export const companies = createInstanceWithAuth('/companies');
export const instance = createInstance('/auth');
