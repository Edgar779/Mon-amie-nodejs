import { celebrate, Joi } from 'celebrate';
import { getCRUDValidators, mergeIndexValidator } from './helpers';

const requiredFields = ['email', 'password'];

const SCHEMA = {
  firstName: Joi.string().label('First Name'),
  lastName: Joi.string().label('Last Name'),
  email: Joi.string().label('Email'),
  password: Joi.string().label('Password')
};

export default {
  index: mergeIndexValidator({
    firstName: Joi.string().label('First Name'),
    lastName: Joi.string().label('Last Name'),
    email: Joi.string().label('Email')
  }),
  ...getCRUDValidators(SCHEMA, requiredFields),
  updateCurrent: celebrate({
    body: SCHEMA
  })
};
