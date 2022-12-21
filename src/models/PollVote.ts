import mongoose from "mongoose";

const PollVoteSchema = new mongoose.Schema({
  pollId: {type: String},
  voter: {type: String},
  answer: {type: String}
});


export default mongoose.models.PollVote || mongoose.model('PollVote', PollVoteSchema)
