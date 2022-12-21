import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  user_id: {type: String, required: true, unique: true},
  banned: {type: Boolean, required: true, default: false},
  email: {type: String, required: true, unique: true},
  last_identity: mongoose.Types.ObjectId,
  display_name: String //fallback for non blockchain user
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
