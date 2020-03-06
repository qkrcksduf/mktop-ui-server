import { companies } from './index';

function selectCompanyList() {
  return companies.get('/companies');
}

function selectCompanyById(id) {
  return companies.get(`/companies/${id}`);
}

function insertCompany(company) {
  return companies.post('/companies', company);
}

function updateCompanyById(company) {
  return companies.put(`/companies/${company.id}`, company);
}

function deleteCompanyById(id) {
  return companies.delete(`companies/${id}`);
}

export {
  selectCompanyList,
  insertCompany,
  updateCompanyById,
  selectCompanyById,
  deleteCompanyById,
};
