import mongoose from "mongoose";

const HiveAccountSchema = new mongoose.Schema({
  account: {type: String, required: true},
  user_id: {type: mongoose.Types.ObjectId, required: true}
})

export default mongoose.models.HiveAccount || mongoose.model('HiveAccount', HiveAccountSchema)

