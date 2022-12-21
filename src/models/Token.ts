import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  access_token: String,
  refresh_token: String,
  expires: Date,
  username: String
});

export default mongoose.models.Token || mongoose.model('Token', TokenSchema)
