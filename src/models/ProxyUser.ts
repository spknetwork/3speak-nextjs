import mongoose from 'mongoose'

const ProxyUserSchema = new mongoose.Schema({
  userId: {type: String, required: true, unique: true},
  proxy: {type: String, required: true},
  pendingPayout: {type: Number, required: true, default: 0},
  banned: {type: Boolean, required: true, default: false}
});

export default mongoose.models.ProxyUser || mongoose.model('ProxyUser', ProxyUserSchema)
