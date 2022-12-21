import mongoose from 'mongoose'

const EmailNotificationSchema = new mongoose.Schema({
  userId: {
    type: String, require: true, unique: true
  },
  channels: [{type: mongoose.Types.ObjectId, required: true, ref: 'ContentCreator'}],
  email: {
    type: String
  },
  allDisabled: {
    type: Boolean, required: true, default: false
  },
  verified: {
    type: Boolean, required: true, default: false
  },
  verificationString: {
    type: String, required: true
  },
  verifiedAt: Date,
  verifiedIP: String
});

export default mongoose.models.EmailNotification || mongoose.model('EmailNotification', EmailNotificationSchema)
