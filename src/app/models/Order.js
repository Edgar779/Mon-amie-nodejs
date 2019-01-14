import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';
import ValidationError from 'exceptions/ValidationError';

const OrderSchema = BaseSchema.extend({
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  videoCall: {
    type: Boolean,
    default: true
  },
  time: {
    type: Date,
    required: true
  },
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      wrap: {
        _id: {
          type: Schema.Types.ObjectId
        },
        name: {
          type: String,
          trim: true
        },
        price: {
          type: Number,
          min: 1
        },
        imageTop: {
          type: String,
        },
        imageBottom: {
          type: String
        }
      },
      tape: {
        _id: {
          type: Schema.Types.ObjectId
        },
        name: {
          type: String,
          trim: true
        },
        price: {
          type: Number,
          min: 1
        },
        image: {
          type: String
        }
      },
      price: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ]
});

OrderSchema.post('validate', (doc, next) => {
  var price = 0;

  doc.products.forEach((product) => {
    var wrapPrice = !product.wrap.price ? 0 : product.wrap.price;
    var tapePrice = !product.tape.price ? 0 : product.tape.price;
    var count = product.count;
    price += count * (wrapPrice + tapePrice + product.price);
  })
  // debugger;
  if(price !== doc.price) {
    next(new ValidationError('Prices not equel'));
  } else {
    next();
  }
});

export default mongoose.model('Order', OrderSchema);
