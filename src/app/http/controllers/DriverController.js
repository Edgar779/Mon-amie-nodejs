import CRUDController from './_CRUDController';
import validators from 'validators/drivers';

import {
  queryDrivers,
  getSingleDriver,
  createDriver,
  updateDriver,
  deleteDriver
} from 'services/drivers';

class DriverController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'Driver';
    this._path = '/drivers';
    this._validators = validators;

    this._query = queryDrivers;
    this._getModel = getSingleDriver;
    this._createModel = createDriver;
    this._updateModel = updateDriver;
    this._deleteModel = deleteDriver;
  }
}

export default new DriverController();
