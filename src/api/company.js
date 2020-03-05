import { companies } from './index';

function selectCompanyByAccountId() {
  return companies.get(`/account/${id}/company`);
}

function selectCompanyList() {
  return companies.get('/companies');
}

function selectCompany(id) {
  return companies.get(`/companies/${id}`);
}

function insertCompany(company) {
  return companies.post('/companies', company);
}

function insertAccount(account) {
  return companies.post('/accounts', account);
}

function updateCompany(company) {
  return companies.put(`/companies/${company.id}`, company);
}

function deleteCompany(id) {
  return companies.delete(`companies/${id}`);
}

export {
  selectCompanyList,
  insertCompany,
  insertAccount,
  updateCompany,
  selectCompany,
  deleteCompany,
};
