import mongoose from "mongoose"

const PlaylistItemSchema = new mongoose.Schema({
  playlist: [{type: mongoose.Types.ObjectId, required: true, ref: 'Playlist'}],
  permlink: String,
  position: Number
});

export default mongoose.models.PlaylistItem || mongoose.model('PlaylistItem', PlaylistItemSchema)
