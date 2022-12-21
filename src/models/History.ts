import mongoose from 'mongoose'

const HistorySchema = new mongoose.Schema({
  userId: {type: String, required: true},
  video: {type: Object, required: true},
  author: {type: String, required: true},
  permlink: {type: String, required: true},
  watchCount: {type: Number, required: true, default: 1},
  lastWatched: {type: Date, required: true, default: Date.now()}
});

export default mongoose.models.History || mongoose.model('History', HistorySchema)
