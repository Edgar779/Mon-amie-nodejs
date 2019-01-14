import express from 'express';
import existingModel from 'middleware/ExistingModel';
import BaseController from 'controllers/_BaseController';
import NotImplementedError from 'exceptions/NotImplementedError';
export default class CRUDController extends BaseController {
  constructor() {
    super();
    this._validators = {};
    this._validators.create = (req, res, next) => next();
    this._validators.update = (req, res, next) => next();
    this._validators.destroy = (req, res, next) => next();
    this._validators.show = (req, res, next) => next();
    this._middleware = [
      (req, res, next) => {
        next();
      }
    ];
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

    app.use(this._path, router);
  }

  index(req, res, next) {
    if (!this._query) {
      return next(new NotImplementedError('Method not yet implemented!'));
    }
    this._query(req.query, req)
      .then(result => {
        res.json(this._createResponse(result));
      })
      .catch(next);
  }

  show(req, res, next) {
    if (!this._getModel) {
      return next(new NotImplementedError('Method not yet implemented!'));
    }
    this._getModel(req.params.id, req)
      .then(model => {
        const data = {};
        data[this._modelName.toLowerCase()] = model;
        res.json(this._createResponse(data));
      })
      .catch(next);
  }

  create(req, res, next) {
    if (!this._createModel) {
      return next(new NotImplementedError('Method not yet implemented!'));
    }
    this._createModel(req.body, req.user, req)
      .then(model => {
        const data = {};
        data[this._modelName.toLowerCase()] = model;
        res.json(this._createResponse(data)).status(201);
      })
      .catch(next);
  }

  update(req, res, next) {
    if (!this._updateModel) {
      return next(new NotImplementedError('Method not yet implemented!'));
    }
    this._updateModel(req.params.id, req.body, req)
      .then(model => {
        const data = {};
        data[this._modelName.toLowerCase()] = model;
        res.json(this._createResponse(data));
      })
      .catch(next);
  }

  destroy(req, res, next) {
    if (!this._deleteModel) {
      return next(new NotImplementedError('Method not yet implemented!'));
    }
    this._deleteModel(req.params.id, req)
      .then(() => {
        res.json(this._createResponse()).status(204);
      })
      .catch(next);
  }
}
