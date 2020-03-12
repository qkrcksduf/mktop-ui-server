import { branches } from '@/api/index';

function selectDevicesByBranch() {
  return branches.get('/devices');
}

function selectDevicesByBranchId(id) {
  return branches.get(`/${id}/devices`);
}

function selectBranchList() {
  return branches.get('/');
}

function selectBranchById(id) {
  return branches.get(`/${id}`);
}

function insertBranch(branch) {
  return branches.post('/', branch);
}

function updateBranchById(branch) {
  return branches.put(`/${branch.id}`, branch);
}

function deleteBranchById(id) {
  return branches.delete(`/${id}`);
}

export {
  selectBranchList,
  insertBranch,
  selectBranchById,
  updateBranchById,
  deleteBranchById,
  selectDevicesByBranchId,
  selectDevicesByBranch,
};
