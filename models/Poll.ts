import mongoose from "mongoose"

const PollSchema = new mongoose.Schema({
  pollId: {type: String},
  communityId: {type: String},
  owner: {type: String},
  question: {type: String},
  answers: {type: [String]},
  description: {type: String},
  expires: {type: Date}
});

export default mongoose.models.Poll || mongoose.model('Poll', PollSchema)
