import validators from 'validators/devices';
import CRUDController from './_CRUDController';

import {
  queryDevices,
  getSingleDevice,
  createDevice,
  updateDevice,
  deleteDevice
} from 'services/devices';

class DeviceController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'Device';
    this._path = '/devices';
    this._validators = validators;

    this._query = queryDevices;
    this._getModel = getSingleDevice;
    this._createModel = createDevice;
    this._updateModel = updateDevice;
    this._deleteModel = deleteDevice;
  }
}

export default new DeviceController();
