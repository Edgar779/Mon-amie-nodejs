import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';
import ValidationError from 'exceptions/ValidationError';

const PromoCodeSchema = BaseSchema.extend({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },

  code: {
    type: String,
    unique: true,
    required: true
  }
});

PromoCodeSchema.virtual('token').get(function() {
  return {
    _id: this._id
  };
});

PromoCodeSchema.pre('validate', function(next) {
  this.constructor
    .exists({
      _id: { $ne: this._id },
      code: this.code
    })
    .then(exists => {
      if (exists) {
        next(new ValidationError('Promo Code already exists'));
      }
      next();
    });
});

PromoCodeSchema.pre('validate', function(next) {
  this.constructor
    .exists({
      _id: { $ne: this._id },
      user: this.user
    })
    .then(exists => {
      if (exists) {
        next(new ValidationError('User already has promo code'));
      }
      next();
    });
});

export default mongoose.model('PromoCode', PromoCodeSchema);
