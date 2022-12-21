import mongoose from "mongoose";

const UploadAPIVideoSchema = new mongoose.Schema({
  file_local: {type: String, required: true},
  thumbnail_local: {type: String, required: true},
  for_channel: {type: String, required: true},
  app: {type: String, required: true},
  title: String,
  created: {type: Date, required: true, default: Date.now()},
  duration: {type: Number, required: true, default: 0},
  size: {type: Number, required: true, default: 0},
  description: String,
  tags: [String],
  status: {
    type: String,
    enum: ['uploaded', 'processed', 'failed'],
    default: 'uploaded',
    required: true
  }
});

export default mongoose.models.UploadAPIVideo || mongoose.model('UploadAPIVideo', UploadAPIVideoSchema)
