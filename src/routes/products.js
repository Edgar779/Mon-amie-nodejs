import express from 'express';
import * as controller from 'controllers/products';
import validators from 'validators/products';
import checkIfModelExists from 'middleware/ExistingModel';

const router = express.Router();

router.get('/', controller.index);
router.post('/', validators.create, controller.create);
router.get(
  '/:id',
  validators.show,
  checkIfModelExists('Product'),
  controller.show
);
router.put(
  '/:id',
  validators.update,
  checkIfModelExists('Product'),
  controller.update
);
router.delete(
  '/:id',
  validators.destroy,
  checkIfModelExists('Product'),
  controller.destroy
);

module.exports = router;
