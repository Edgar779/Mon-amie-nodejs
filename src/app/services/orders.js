import Order from 'model/Order';
import { parseQueryOptions } from 'lib/utils';

export function queryOrders(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  return Order.paginate(query, options).then(result => {
    const data = {
      ...result,
      orders: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleOrder(id) {
  return Order.findById(id);
}

export async function createOrder(data, creator = null) {
  return Order.create(data);
}

export function updateOrder(id, data) {
  return Order.findById(id).then(order => {
    order.mergeWithData(data);
    return order.save();
  });
}

export function deleteOrder(id, deletedBy) {
  return Order.findById(id).then(order => order.delete(deletedBy));
}
