import { Joi } from 'celebrate';
import { getCRUDValidators } from './helpers';

const requiredFields = ['name', 'image'];

const SCHEMA = {
  name: Joi.string().label('Name'),
  image: Joi.string().label('Image')
};

export default {
  ...getCRUDValidators(SCHEMA, requiredFields)
};
