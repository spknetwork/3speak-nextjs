import mongoose from 'mongoose'

const PodcastSchema = new mongoose.Schema({
  filename: {type: String, required: true},
  thumbnail: String,
  score: {type: Number, required: true, default: 0},
  title: String,
  tags: [String],
  description: String,
  status: {
    type: String,
    enum: ['uploaded', 'encoding', 'saving', 'published', 'deleted', 'encoding_failed', 'encoding_queued', 'encoding_halted_time', 'encoding_queued_vod'],
    default: 'uploaded',
    required: true
  },
  size: {type: Number, required: true},
  permlink: {type: String, required: true},
  duration: {type: Number, required: false},
  created: {type: Date, required: true, default: Date.now()},
  owner: {type: String, required: true},
  pinned: {type: Boolean, required: true, default: false},
  isNsfwContent: {type: Boolean, default: false},
  language: {type: String, required: false, default: 'en'},
  category: {type: String, required: false, default: 'general'},
  hive: {type: String, default: 'hive-181335'},
  indexed: {type: Boolean, default: false},
  views: {type: Number, default: 0},
  upvoteEligible: {type: Boolean, default: true},
  app: {type: String, required: true, default: 'threespeak'},
  hasTorrent: {type: Boolean, required: true, default: false},
  receipt: String
});

export default mongoose.models.Podcast || mongoose.model('Podcast', PodcastSchema)
