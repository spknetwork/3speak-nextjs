import mongoose from 'mongoose'

const ViewSchema = new mongoose.Schema({
  author: {type: String, required: true},
  permlink: {type: String, required: true},
  userIP: {type: String, required: true},
  userAgent: {type: String},
  timestamp: {type: Date, required: true, default: new Date()}
});

export default mongoose.models.View || mongoose.model('View', ViewSchema)
