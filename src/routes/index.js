import express from 'express';
import AddressesController from 'controllers/AddressesController';
import AuthController from 'controllers/AuthController';
import DeviceController from 'controllers/DeviceController';
import OrderController from 'controllers/OrderController';
import ProductCategoryController from 'controllers/ProductCategoryController';
import ProductController from 'controllers/ProductController';
import UserController from 'controllers/UserController';
import PromoCodeController from 'controllers/PromoCodeController';
import DriverController from 'controllers/DriverController';
import TestPushController from 'controllers/TestPushController';
import PaymentController from 'controllers/PaymentController';

import { RequireDeviceId } from '../app/http/middleware/RequireDeviceId';

module.exports = app => {
  const router = express.Router();
  AuthController.registerRoutes(router);
  AddressesController.registerRoutes(router);
  DeviceController.registerRoutes(router);
  OrderController.registerRoutes(router);
  ProductCategoryController.registerRoutes(router);
  ProductController.registerRoutes(router);
  UserController.registerRoutes(router);
  PromoCodeController.registerRoutes(router);
  DriverController.registerRoutes(router);
  TestPushController.registerRoutes(router);
  PaymentController.registerRoutes(router);

  app.use('/v1', RequireDeviceId);
  app.use('/v1', router);
  return router;
};
