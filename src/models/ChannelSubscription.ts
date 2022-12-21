import mongoose from "mongoose";

const ChannelSubscriptionSchema = new mongoose.Schema({
  user_id: {type: String},
  channel: String,
  order_id: {type: mongoose.Types.ObjectId},
  ends_at: Date
});


export default mongoose.models.ChannelSubscription || mongoose.model('ChannelSubscription', ChannelSubscriptionSchema)
