import mongoose from "mongoose";

const VideoBoostSchema = new mongoose.Schema({
  user_id: {type: String},
  permlink: String,
  order_id: {type: mongoose.Types.ObjectId},
  boost: Number
});

export default mongoose.models.VideoBoost || mongoose.model('VideoBoost', VideoBoostSchema)
