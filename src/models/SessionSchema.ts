import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
  expires: {type: Date},
  session: {type: String}
});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema)
