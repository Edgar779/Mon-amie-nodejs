import validators from 'validators/orders';
import CRUDController from './_CRUDController';
import { createPaymentUrl, hashCode } from 'lib/utils';
import existingModel from 'middleware/ExistingModel';
import express from 'express';
import axios from 'axios';
import BadRequestError from '../exceptions/BadRequestError';
import { getPayment, confirmPayment } from 'services/payments';
import {
  queryOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from 'services/orders';

class OrderController extends CRUDController {
  constructor() {
    super();
    this._modelName = 'Order';
    this._path = '/orders';
    this._validators = validators;

    this._query = queryOrders;
    this._getModel = getSingleOrder;
    this._createModel = createOrder;
    this._updateModel = updateOrder;
    this._deleteModel = deleteOrder;
  }

  registerRoutes(app) {
    const router = express.Router();

    router.get('/', this.index.bind(this));
    router.post(
      '/',
      this._validators.create,
      ...this._middleware,
      this.create.bind(this)
    );
    router.get(
      '/:id',
      this._validators.show,
      existingModel(this._modelName),
      this.show.bind(this)
    );
    router.put(
      '/:id',
      this._validators.update,
      existingModel(this._modelName),
      this.update.bind(this)
    );
    router.delete(
      '/:id',
      this._validators.destroy,
      existingModel(this._modelName),
      this.destroy.bind(this)
    );

    router.get('/:id/pay', this.getPaymentId.bind(this));
    router.get('/pay', this.paymentResult.bind(this));
    router.post('/pay/confirm', this.confirm.bind(this));

    app.use(this._path, router);
  }

  getPaymentId(req, res, next) {
    getSingleOrder(req.params.id)
      .then(({ id, price }) => {
        return getPayment(id, price);
      })
      .then(({ result }) => {
        if (
          result.GetPaymentIDResult.Respcode !== 1 ||
          result.GetPaymentIDResult.Respmessage !== 'OK'
        ) {
          return next(new BadRequestError(result.Respmessage));
        }
        res.redirect(createPaymentUrl(result.GetPaymentIDResult.PaymentID));
      })
      .catch(next);
  }

  paymentResult(req, res, next) {
    getSingleOrder(req.params.id)
      .then((id, price) => {
        return axios.post(`${getRequestUrl(req)}/v1/orders/pay/confirm`, {
          ClientID: process.env.PAYMENT_CLIENT_ID,
          Username: process.env.PAYMENT_USERNAME,
          Password: process.env.PAYMENT_PASSWORD,
          OrderId: hashCode(id),
          PaymentAmount: price
        });
      })
      .then(result => {
        if (result.GetPaymentFieldsResult.respcode !== '00') {
          return next(new BadRequestError('Error. Payment was failed'));
        }
        res.redirect(
          `https://testpayments.ameriabank.am/forms/frm_checkprint.aspx?paymentid=${
            req.params.paymentid
          }&lang=en`
        );
      })
      .catch(next);
  }

  confirm(req, res, next) {
    confirmPayment(req.body)
      .then(({ result }) => {
        if (result.Respcode !== '1' || result.Respmessage !== 'OK') {
          return next(new BadRequestError(result.Respmessage));
        }
        res.json(result).status(201);
      })
      .catch(next);
  }
}

export default new OrderController();
