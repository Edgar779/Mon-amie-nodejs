import Driver from 'model/Driver';
import { parseQueryOptions } from 'lib/utils';

export function queryDrivers(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }

  return Driver.paginate(query, options).then(result => {
    const data = {
      ...result,
      drivers: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleDriver(id) {
  return Driver.findById(id);
}

export async function createDriver(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return Driver.create(data, createdById);
}

export function updateDriver(id, data) {
  return Driver.findById(id).then(driver => {
    driver.mergeWithData(data);
    return driver.save();
  });
}

export function deleteDriver(id, deletedBy) {
  return Driver.findById(id).then(driver => driver.delete(deletedBy));
}
