import mongoose from 'mongoose'

const UploadAPIPartnerSchema = new mongoose.Schema({
  app_id: {type: String, required: true, unique: true},
  app_secret: {type: String, required: true, unique: true},
  contact: {type: String, required: true},
  created: {type: Date, required: true, default: Date.now()},
  redirect_uris: [String],
  name: String,
  tos: String,
  privacy_policy: String,
  homepage: String
});

export default mongoose.models.UploadAPIPartner || mongoose.model('UploadAPIPartner', UploadAPIPartnerSchema)
