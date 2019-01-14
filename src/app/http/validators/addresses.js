import { Joi } from 'celebrate';
import { getCRUDValidators } from './helpers';

const requiredFields = ['street', 'city', 'state', 'country'];

const SCHEMA = {
  street: Joi.array()
    .items(Joi.string())
    .label('Street'),
  city: Joi.string().label('City'),
  state: Joi.string().label('State'),
  country: Joi.string().label('Country'),
  zip: Joi.string().label('Zip'),
  location: Joi.string().label('Location') // Type need to be defined
};

export default {
  ...getCRUDValidators(SCHEMA, requiredFields)
};
