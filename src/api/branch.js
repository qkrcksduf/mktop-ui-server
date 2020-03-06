import { branches } from '@/api/index';

function selectBranchList() {
  return branches.get('branches');
}

function selectBranchById(id) {
  return branches.get(`branches/${id}`);
}

function insertBranch(branch) {
  return branches.post('branches', branch);
}

function updateBranchById(branch) {
  return branches.put(`branches/${branch.id}`, branch);
}

function deleteBranchById(id) {
  return branches.delete(`branches/${id}`);
}

export {
  selectBranchList,
  insertBranch,
  selectBranchById,
  updateBranchById,
  deleteBranchById,
};
