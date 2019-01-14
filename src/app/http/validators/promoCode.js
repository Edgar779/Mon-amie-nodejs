import { celebrate, Joi } from 'celebrate';
import { getCRUDValidators, mergeIndexValidator } from './helpers';

const requiredFields = ['user', 'code'];

const SCHEMA = {
  user: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .label('User'),
  code: Joi.string().label('Promo Code')
};

export default {
  index: mergeIndexValidator({
    user: Joi.string().label('User'),
    code: Joi.string().label('Promo Code')
  }),
  ...getCRUDValidators(SCHEMA, requiredFields),
  updateCurrent: celebrate({
    body: SCHEMA
  })
};
