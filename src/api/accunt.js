import { accounts } from '@/api/index';

function selectAccountById(id) {
  return accounts.get(`/${id}`);
}

function insertAccount(account) {
  return accounts.post('/', account);
}

function updateInfoById(account) {
  return accounts.put(`/${account.id}`, account);
}

function updatePassword(account) {
  return accounts.put(`/${account.id}/password`, account);
}

export { selectAccountById, insertAccount, updateInfoById, updatePassword };
