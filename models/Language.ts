import mongoose from 'mongoose'

const LanguageSchema = new mongoose.Schema({
  code: {type: String, required: true},
  language: {type: String, required: true}
});

export default mongoose.models.Language || mongoose.model('Language', LanguageSchema)
