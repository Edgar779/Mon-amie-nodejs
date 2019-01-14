import ProductCategory from 'model/ProductCategory';
import { parseQueryOptions } from 'lib/utils';

export function queryProductCategories(params) {
  const options = parseQueryOptions(params);
  const query = {};
  if (params.id) {
    query._id = params.id;
  }
  return ProductCategory.paginate(query, options).then(result => {
    const data = {
      ...result,
      productCategories: result.docs
    };
    delete data.docs;
    return data;
  });
}

export function getSingleProductCategory(id) {
  return ProductCategory.findById(id);
}

export async function createProductCategory(data, creator = null) {
  const createdById = creator ? creator._id : null;
  return ProductCategory.create(data, createdById);
}

export function updateProductCategory(id, data) {
  return ProductCategory.findById(id).then(productCategory => {
    productCategory.mergeWithData(data);
    return productCategory.save();
  });
}

export function deleteProductCategory(id, deletedBy) {
  return ProductCategory.findById(id).then(ProductCategory =>
    ProductCategory.delete(deletedBy)
  );
}
