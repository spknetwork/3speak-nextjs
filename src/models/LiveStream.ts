import mongoose from 'mongoose'

const LiveStreamSchema = new mongoose.Schema({
  channel: {type: String, required: true, unique: true},
  streamkey: {type: String, required: true, unique: true},
  title: {type: String, required: true},
  tier: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
    default: 1
  },
  is247: {type: Boolean, required: true, default: false}
});

export default mongoose.models.LiveStream || mongoose.model('LiveStream', LiveStreamSchema)
