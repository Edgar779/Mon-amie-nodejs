import validators from 'validators/users';
import CRUDController from './_CRUDController';

import {
  queryUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} from 'services/users';

class UserController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'User';
    this._path = '/users';
    this._validators = validators;

    this._query = queryUsers;
    this._getModel = getSingleUser;
    this._createModel = createUser;
    this._updateModel = updateUser;
    this._deleteModel = deleteUser;
  }
}

export default new UserController();
