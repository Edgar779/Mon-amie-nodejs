import CRUDController from './_CRUDController';
import validators from 'validators/promoCode';

import {
  queryPromoCode,
  getSinglePromoCode,
  createPromoCode,
  updatePromoCode,
  deletePromoCode
} from 'services/promoCode';

class PromoCodeController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'PromoCode';
    this._path = '/promocode';

    this._query = queryPromoCode;
    this._getModel = getSinglePromoCode;
    this._createModel = createPromoCode;
    this._updateModel = updatePromoCode;
    this._deleteModel = deletePromoCode;
  }
}

export default new PromoCodeController();
