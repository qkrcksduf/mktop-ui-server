import { devices } from '@/api/index';

function selectDevices() {
  return devices.get('/');
}

function selectDeviceById(id) {
  return devices.get(`/${id}`);
}

function insertDevice(device) {
  return devices.post('/', device);
}

function updateDeviceById(device) {
  return devices.put(`/${device.id}`, device);
}

function deleteDeviceById(id) {
  return devices.delete(`/${id}`);
}

function lock(id) {
  console.log(id);
  return devices.post(`/${id}/lock`);
}

export {
  selectDevices,
  selectDeviceById,
  insertDevice,
  updateDeviceById,
  deleteDeviceById,
  lock,
};
