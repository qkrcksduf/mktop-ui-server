import { companies } from './index';

function selectCompanyList() {
  return companies.get('/');
}

function selectCompanyById(id) {
  return companies.get(`/${id}`);
}

function insertCompany(company) {
  return companies.post('/', company);
}

function updateCompanyById(company) {
  return companies.put(`/${company.id}`, company);
}

function deleteCompanyById(id) {
  return companies.delete(`/${id}`);
}

export {
  selectCompanyList,
  insertCompany,
  updateCompanyById,
  selectCompanyById,
  deleteCompanyById,
};
