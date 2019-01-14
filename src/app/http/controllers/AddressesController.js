import CRUDController from './_CRUDController';
import validators from 'validators/addresses';

import {
  queryAddresses,
  getSingleAddress,
  createAddress,
  updateAddress,
  deleteAddress
} from 'services/addresses';

class AddressesController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'Address';
    this._path = '/addresses';
    this._validators = validators;

    this._query = queryAddresses;
    this._getModel = getSingleAddress;
    this._createModel = createAddress;
    this._updateModel = updateAddress;
    this._deleteModel = deleteAddress;
  }
}

export default new AddressesController();
