import express from 'express';
import BaseController from 'controllers/_BaseController';
import { sendPush } from 'services/push';

class TestPushController extends BaseController {
  constructor(app) {
    super();
  }

  registerRoutes(app) {
    const router = express.Router();
    router.get('/', this.push.bind(this));
    app.use('/push', router);
  }

  push(req, res, next) {
    sendPush('testToken')
      .then(response => {
        res.json(
          this._createResponse({
            message: response
          })
        );
      })
      .catch(err => res.status(500).json(err));
  }
}

export default new TestPushController();
