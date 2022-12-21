import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  userId: {type: String},
  acknowledged: {type: Boolean, required: true, default: false},
  type: {
    type: String, enum: [
      'video_uploaded',
      'new_comment',
      'new_like',
      'new_subscribe',
      'donation'
    ], required: true
  },
  created: {type: Date, required: true, default: Date.now()},
  metadata: {type: Object},
  channel: {type: String}
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema)
