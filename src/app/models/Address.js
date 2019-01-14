import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';

const AddressSchema = BaseSchema.extend({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  street: [
    {
      type: String,
      required: true,
    }
  ],
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip: {
    type: Number
  },
  location: {
    type: Object
  }
});

export default mongoose.model('Address', AddressSchema);
