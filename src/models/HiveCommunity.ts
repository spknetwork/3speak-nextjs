import mongoose from 'mongoose'

const HiveCommunitySchema = new mongoose.Schema({
  name: String,
  title: String,
  sum_pending: Number,
  num_authors: Number,
  subscribers: Number,
  used: Boolean
})
  
export default mongoose.models.HiveCommunity || mongoose.model('HiveCommunity', HiveCommunitySchema)
