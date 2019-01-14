import { Joi } from 'celebrate';
import { getCRUDValidators } from './helpers';

const requiredFields = ['deviceId', 'deviceType', 'token', 'language'];

const SCHEMA = {
  user: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .label('User'),
  deviceId: Joi.string().label('Device Id'),
  token: Joi.string().label('Token'),
  deviceType: Joi.string()
    .valid(['ios', 'android'])
    .label('Device Type'),
  language: Joi.string()
    .valid(['AM', 'RU', 'EN'])
    .label('Language')
};

export default {
  ...getCRUDValidators(SCHEMA, requiredFields)
};
