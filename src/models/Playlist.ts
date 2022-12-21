import mongoose from "mongoose"

const PlaylistSchema = new mongoose.Schema({
  owner: String,
  permlink: String,
  /*type: {type: String, required: true, enum: ['user', 'creator']},
  title: String,
  visibility: {type: String, required: true, enum: ['public', 'unlisted', 'private']},
  protected: Boolean,
  tags: [String],
  version: {
    type: String,
    required: true,
    enum: ['regular', 'web3']
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  modified_at: {
    type: Date,
    required: false,
    default: Date.now()
  }*/
  title: String,
  tags: [String],
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  },
  modified_at: {
    type: Date,
    required: false,
    default: Date.now()
  },
  list: [{
    owner: String,
    permlink: String,
    added_at: {
      type: Date,
      required: false,
      default: Date.now()
    }
  }]
});

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema)
