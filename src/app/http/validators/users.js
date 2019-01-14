import { celebrate, Joi } from 'celebrate';
import { getCRUDValidators, mergeIndexValidator } from './helpers';

const requiredFields = ['email', 'password'];

const SCHEMA = {
  firstName: Joi.string().label('First Name'),
  lastName: Joi.string().label('Last Name'),
  email: Joi.string().label('Email'),
  password: Joi.string().label('Password'),
  dob: Joi.date()
    .iso()
    .label('Dob'),
  phone: Joi.string().label('Phone')
};

export default {
  index: mergeIndexValidator({
    search: Joi.string(),
    firstName: Joi.string().label('First Name'),
    lastName: Joi.string().label('Last Name'),
    email: Joi.string().label('Email'),
    role: Joi.number()
  }),
  ...getCRUDValidators(SCHEMA, requiredFields),
  updateCurrent: celebrate({
    body: SCHEMA
  })
};
