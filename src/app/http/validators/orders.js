import { Joi } from 'celebrate';
import { getCRUDValidators } from './helpers';

const requiredFields = ['address', 'products', 'price'];

const SCHEMA = {
  address: Joi.string().regex(/^[a-f\d]{24}$/i).label('Address'),
  price: Joi.number().label('Price'),
  videoCall: Joi.boolean().label('VideoCall'),
  time: Joi.date().label('Time'),
  products: Joi.array()
    .items({
      _id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      wrap: Joi.object()
        .keys({
          _id: Joi.string().regex(/^[a-f\d]{24}$/i).required(),
          name: Joi.string().trim().required(),
          price: Joi.number().required(),
          imageTop: Joi.string().required(),
          imageBottom: Joi.string().required()
        }),
      tape: Joi.object()
        .keys({
          _id: Joi.string().regex(/^[a-f\d]{24}$/i).required(),
          name: Joi.string().trim().required(),
          price: Joi.number().required(),
          image: Joi.string().required()
        }),
      price: Joi.number().required(),  
      count: Joi.number().required()
    })
    .label('Products')
};

export default {
  ...getCRUDValidators(SCHEMA, requiredFields)
};
