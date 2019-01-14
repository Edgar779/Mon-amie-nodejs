import { getPayment, confirmPayment } from 'services/payments';
import { createPaymentUrl, getRequestUrl } from 'lib/utils';
import BaseController from 'controllers/_BaseController';
import express from 'express';
import axios from 'axios';
import BadRequestError from '../exceptions/BadRequestError';

class PaymentController extends BaseController {
  constructor(app) {
    super();
  }

  registerRoutes(app) {
    const router = express.Router();

    router.post('/', this.getPaymentId.bind(this));
    router.get('/', this.paymentResult.bind(this));
    router.post('/confirm', this.confirm.bind(this));

    app.use('/payment', router);
  }

  getPaymentId(req, res, next) {
    getPayment(req.body)
      .then(({ result }) => {
        if (
          result.GetPaymentIDResult.Respcode !== 1 ||
          result.GetPaymentIDResult.Respmessage !== 'OK'
        ) {
          return next(new BadRequestError(result.Respmessage));
        }
        res
          .json(
            this._createResponse({
              url: createPaymentUrl(result.GetPaymentIDResult.PaymentID)
            })
          )
          .status(201);
      })
      .catch(next);
  }

  paymentResult(req, res, next) {
    axios
      .post(`${getRequestUrl(req)}/v1/payment/confirm`, {
        ClientID: process.env.PAYMENT_CLIENT_ID,
        Username: process.env.PAYMENT_USERNAME,
        Password: process.env.PAYMENT_PASSWORD,
        OrderId: req.params.orderid,
        PaymentAmount: '512' // needs to be changed
      })
      .then(result => {
        if (result.GetPaymentFieldsResult.respcode !== '00') {
          return next(new BadRequestError('Error. Payment was failed'));
        }
        res
          .json(
            this._createResponse({
              url: `https://testpayments.ameriabank.am/forms/frm_checkprint.aspx?paymentid=${
                req.params.paymentid
              }&lang=en`
            })
          )
          .status(201);
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

export default new PaymentController();
