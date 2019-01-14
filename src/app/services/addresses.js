import Address from 'model/Address';
import { parseQueryOptions } from 'lib/utils';

export function queryAddresses(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  return Address.paginate(query, options).then(result => {
    const data = {
      ...result,
      addressed: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleAddress(id) {
  return Address.findById(id);
}

export async function createAddress(data, creator = null) {
  data.user = creator;
  return Address.create(data);
}

export function updateAddress(id, data) {
  return Address.findById(id).then(address => {
    address.mergeWithData(data);
    return address.save();
  });
}

export function deleteAddress(id, deletedBy) {
  return Address.findById(id).then(address => address.delete(deletedBy));
}
