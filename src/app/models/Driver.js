import mongoose from 'mongoose';

import BaseSchema from 'model/BaseSchema';
import ValidationError from 'exceptions/ValidationError';
import { hashPassword, generateSalt } from 'lib/security';

const DriverSchema = BaseSchema.extend(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: false
      }
    },
    _password: {
      hash: {
        type: String,
        required: true
      },
      salt: {
        type: String,
        required: true
      },
      hashed: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        Reflect.deleteProperty(ret, '_id');
        Reflect.deleteProperty(ret, '__v');
        Reflect.deleteProperty(ret, '__t');
        Reflect.deleteProperty(ret, '_password');
        Reflect.deleteProperty(ret, 'deleted');
        /* eslint-disable no-param-reassign */
        ret.id = doc._id;
        ret.fullName = doc.fullName;
      }
    }
  }
);

DriverSchema.virtual('token').get(function() {
  return {
    _id: this._id
  };
});

DriverSchema.virtual('fullName').get(function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || undefined;
});

DriverSchema.virtual('password').set(function(value) {
  this._password = {
    hash: value,
    salt: generateSalt(),
    hashed: false
  };
});

DriverSchema.pre('validate', function(next) {
  this.constructor
    .exists({
      _id: { $ne: this._id },
      email: this.email
    })
    .then(exists => {
      if (exists) {
        next(new ValidationError('Email already exists'));
      }
      next();
    });
});

DriverSchema.pre('save', function(next) {
  if (this._password.hashed) {
    return next();
  }
  return hashPassword(this._password.hash, this._password.salt)
    .then(passwordHash => {
      this._password.hash = passwordHash;
      this._password.hashed = true;
      next();
    })
    .catch(next);
});

DriverSchema.methods.verifyPassword = function(password) {
  return hashPassword(password, this._password.salt).then(
    passwordHash => this._password.hash === passwordHash
  );
};

export default mongoose.model('Driver', DriverSchema);
