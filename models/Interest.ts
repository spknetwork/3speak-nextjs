import mongoose from "mongoose"

const InterestSchema = new mongoose.Schema({
  tag: String,
  month: Number,
  year: Number,
  count: Number
});

export default mongoose.models.Interest || mongoose.model('Interest', InterestSchema)
