import mongoose from 'mongoose';

const CategoryRequestSchema = new mongoose.Schema({
  username: {type: String, default: null},
  categoryReq: {type: String, required: true}
});

export default mongoose.models.CategoryRequest || mongoose.model('CategoryRequest', CategoryRequestSchema)