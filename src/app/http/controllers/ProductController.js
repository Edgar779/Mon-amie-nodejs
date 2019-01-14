import ValidationError from '../exceptions/ValidationError';
import validators from 'validators/products';
import CRUDController from './_CRUDController';
import _ from 'lodash';
import { upload } from '../middleware/FileUpload';

import {
  queryProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from 'services/products';

class ProductController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'Product';
    this._path = '/products';
    // this._validators = validators;
    this._middleware = [upload];

    this._query = queryProducts;
    this._getModel = getSingleProduct;
    this._createModel = createProduct;
    this._updateModel = updateProduct;
    this._deleteModel = deleteProduct;
  }

  create(req, res, next) {
    const product = Object.assign({}, req.body);

    req.files.forEach(file => {
      if(file.mimetype.split('/')[0] !== 'image') {
        next(new ValidationError(`File should be image given ${file.mimetype}`));
      }
      _.set(
        product,
        file.fieldname,
        file.path.replace('public/', `${req.protocol}://${req.hostname}:3000/`)
      );
    });

    this._createModel(req.body, req.user)
      .then(product => {
        res.json({ product }).status(201);
      })
      .catch(next);
  }
}

export default new ProductController();
