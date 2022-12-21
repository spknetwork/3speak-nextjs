import mongoose from 'mongoose'

const LiveViewSchema = new mongoose.Schema({
  channel: {type: String, required: true},
  userIP: {type: String, required: true},
  userAgent: {type: String},
  timestamp: {type: Date, required: true, default: new Date()}
});

export default mongoose.models.LiveView || mongoose.model('LiveView', LiveViewSchema)
