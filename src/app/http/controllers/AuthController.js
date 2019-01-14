import express from 'express';
import existingModel from 'middleware/ExistingModel';
import passport from 'passport';
import * as validators from 'validators/auth';
import BaseController from 'controllers/_BaseController';

import ForbiddenError from 'exceptions/ForbiddenError';
import { createJwtToken } from 'services/auth';
import { createUser } from 'services/users';

class AuthController extends BaseController {
  constructor(app) {
    super();
  }

  registerRoutes(app) {
    const router = express.Router();

    router.post('/login', validators.login, this.login.bind(this));
    router.post('/register', validators.register, this.register.bind(this));

    app.use('/auth', router);
  }

  login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        res.status(500).json(err);
      }
      if (!user) {
        return next(
          new ForbiddenError('Incorrect credentials. Authentication failed.')
        );
      }
      res.json(this._createResponse({
        token: createJwtToken(user),
        user
      }));
    })(req, res);
  }

  register(req, res, next) {
    createUser(req.body, req.device)
      .then(user => {
        res.json(this._createResponse({
          token: createJwtToken(user),
          user,
        })).status(201);
      })
      .catch(next);
  }
}

export default new AuthController();
