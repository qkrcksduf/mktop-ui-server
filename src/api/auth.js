import { instance } from './index';

function loginUser(userData) {
  return instance.post('/auth/login', userData);
}

export { loginUser };
