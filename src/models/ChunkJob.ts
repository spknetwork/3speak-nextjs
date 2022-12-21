import mongoose from "mongoose";

const ChunkJobSchema = new mongoose.Schema({
  job_id: {type: String},
  permlink: {type: String}
})

export default mongoose.models.ChunkJob || mongoose.model('ChunkJob', ChunkJobSchema)
