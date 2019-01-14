import validators from 'validators/productCategories';
import CRUDController from './_CRUDController';

import {
  queryProductCategories,
  getSingleProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
} from 'services/productCategories';

class ProductCategoryController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'ProductCategory';
    this._path = '/product-categories';
    this._validators = validators;

    this._query = queryProductCategories;
    this._getModel = getSingleProductCategory;
    this._createModel = createProductCategory;
    this._updateModel = updateProductCategory;
    this._deleteModel = deleteProductCategory;
  }
}

export default new ProductCategoryController();
