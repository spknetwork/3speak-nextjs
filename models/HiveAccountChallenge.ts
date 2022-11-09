import mongoose from "mongoose";

const HiveAccountChallengeSchema = new mongoose.Schema({
  account: {type: String, required: true},
  user_id: {type: String, required: true},
  challenge: {type: String, required: true, unique: true},
  key: {type: String, required: true, default: 'posting', enum: ['posting', 'active']}
})

export default mongoose.models.HiveAccountChallenge || mongoose.model('HiveAccountChallenge', HiveAccountChallengeSchema)
