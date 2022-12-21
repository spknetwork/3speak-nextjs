import mongoose from "mongoose";

const UploadAPITokenSchema = new mongoose.Schema({
  token: String,
  username: String,
  app: String
});

export default mongoose.models.UploadAPIToken || mongoose.model('UploadAPIToken', UploadAPITokenSchema)
