import { Joi } from 'celebrate';
import { getCRUDValidators } from './helpers';

const requiredFields = [
  'productCategory',
  'name',
  'price',
  'availableCount'
];

const wrapSchema = Joi.object().keys({
  name: Joi.string().required().label('Wrap name'),
  imageTop: Joi.string().required().label('Wrap imageTop'),
  imageBottom: Joi.string().required().label('Wrap imageBottom'),
  price: Joi.number().required().label('Wrap price')
});

const tapeSchema = Joi.object().keys({
  name: Joi.string().required().label('Tape name'),
  image: Joi.string().required().label('Tape name'),
  price: Joi.number().required().label('Tape price')
});

const SCHEMA = {
  productCategory: Joi.string().regex(/^[a-f\d]{24}$/i).label('Product Category'),
  name: Joi.string().label('Name'),
  size: Joi.number().label('Size'),
  price: Joi.number().label('Price'),
  availableCount: Joi.number().label('Available Count'),
  wraps: Joi.array().items(wrapSchema).label('Wraps'),
  tapes: Joi.array().items(tapeSchema).label('Wraps'),
};

export default {
  ...getCRUDValidators(SCHEMA, requiredFields)
};
