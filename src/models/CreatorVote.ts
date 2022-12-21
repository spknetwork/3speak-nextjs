import mongoose from 'mongoose'

const CreatorVoteSchema = new mongoose.Schema({
  username: {type: String, required: true},
  author: {type: String, required: true},
  permlink: {type: String, required: true},
  dollars: {type: Number, required: true, default: 0},
  created: {type: Date, required: true, default: Date.now()}
});

export default mongoose.models.CreatorVote || mongoose.model('CreatorVote', CreatorVoteSchema)
