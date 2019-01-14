import mongoose from 'mongoose';

import BaseSchema from 'model/BaseSchema';

const ProductCategorySchema = BaseSchema.extend({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

export default mongoose.model('ProductCategory', ProductCategorySchema);
