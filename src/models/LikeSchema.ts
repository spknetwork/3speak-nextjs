import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  permlink: {type: String, required: true},
  author: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now()}
});

export default mongoose.models.Like || mongoose.model('Like', LikeSchema)
