import { instance } from './index';

function loginUser(userData) {
  return instance.post('/login', userData);
}

export { loginUser };
