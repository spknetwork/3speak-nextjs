import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  channel: {type: String, required: true},
  permlink: String,
  status: {
    type: String,
    enum: ['draft', 'published', 'deleted'],
    required: true,
    default: 'draft'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'social',
      'announcement',
      'general',
      'gaming',
      'politics',
      'other'
    ],
    required: true,
    default: 'general'
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  thumbnail: {
    type: String,
    required: true,
    default: null
  }
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)
