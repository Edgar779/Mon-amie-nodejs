import Product from 'model/Product';
import { parseQueryOptions } from 'lib/utils';

export function queryProducts(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  if (params.product_category) {
    query.productCategory = params.product_category;
  }

  return Product.paginate(query, options).then(result => {
    const data = {
      ...result,
      products: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleProduct(id) {
  return Product.findById(id);
}

export async function createProduct(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return Product.create(data, createdById);
}

export function updateProduct(id, data) {
  return Product.findById(id).then(product => {
    product.mergeWithData(data);
    return product.save();
  });
}

export function deleteProduct(id, deletedBy) {
  return Product.findById(id).then(product => product.delete(deletedBy));
}
