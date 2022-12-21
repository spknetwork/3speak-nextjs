import mongoose from 'mongoose';

const ContentCategorySchema = new mongoose.Schema({
  code: {type: String, required: true},
  display: {type: String, required: true},
  videoOnly: {type: Boolean, default: false}
});

export default mongoose.models.ContentCategory || mongoose.model('ContentCategory', ContentCategorySchema)
