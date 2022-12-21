import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  channel: {type: String, required: true},
  followed_since: {type: Date, required: true, default: Date.now()},
  notifications: {type: Boolean, required: true, default: true}
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema)