import mongoose, { Schema } from 'mongoose';
import BaseSchema from 'model/BaseSchema';

const ProductSchema = BaseSchema.extend({
  productCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true,
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: false,
    },
  },
  size: {
    type: Number,
  },
  price: {
    type: Number,
    required: true
  },
  availableCount: {
    type: Number,
    required: true,
  },
  wraps: {
    type: [{
      name: {
        type: String,
        required: true
      },
      imageTop: {
        type: String,
        required: true
      },
      imageBottom: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    }],
  },
  tapes: {
    type: [{
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
    }],
  },
}, {
  toJSON: {
    transform(doc, ret) {
      Reflect.deleteProperty(ret, '_id');
      Reflect.deleteProperty(ret, '__v');
      Reflect.deleteProperty(ret, '__t');
      /* eslint-disable no-param-reassign */
      ret.id = doc._id;
      ret.image = doc.image;
      ret.price = doc.price;
    },
  },
});

ProductSchema.virtual('image')
  .get(function () {
    return this.wraps[0].imageTop;
  });

export default mongoose.model('Product', ProductSchema);
