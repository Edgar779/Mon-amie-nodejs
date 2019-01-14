import Device from 'model/Device';
import { parseQueryOptions } from 'lib/utils';

export function queryDevices(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  return Device.paginate(query, options).then(result => {
    const data = {
      ...result,
      devices: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleDevice(id) {
  return Device.findById(id);
}

export async function createDevice(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return Device.create(data, createdById);
}

export function updateDevice(id, data) {
  return Device.findById(id).then(device => {
    device.mergeWithData(data);
    return device.save();
  });
}

export function deleteDevice(id, deletedBy) {
  return Device.findById(id).then(device => device.delete(deletedBy));
}
