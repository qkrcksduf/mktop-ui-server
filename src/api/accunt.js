import { accounts } from '@/api/index';

function selectAccountById(id) {
  return accounts.get(`/accounts/${id}`);
}

function insertAccount(account) {
  return accounts.post('/accounts', account);
}

function updateInfoById(account) {
  return accounts.put('/accounts', account);
}

function updatePassword(account) {
  return accounts.put('/accounts/password', account);
}

export { selectAccountById, insertAccount, updateInfoById, updatePassword };
