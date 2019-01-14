import mongoose, { Schema } from 'mongoose';

import BaseSchema from 'model/BaseSchema';

const DeviceSchema = BaseSchema.extend({
  deviceId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    enum: ['ios', 'android'],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  language: {
    type: String,
    enum: ['AM', 'RU', 'EN'],
    required: true,
  },
});

export default mongoose.model('Device', DeviceSchema);
