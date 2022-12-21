import mongoose from 'mongoose';
import { Languages } from 'src/models/LanguageSetting'

export interface ILanguage {
  code: Languages;
  language: string;
}

const LanguageSchema = new mongoose.Schema<ILanguage>({
  code: { type: String, required: true },
  language: { type: String, required: true },
});

export default mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);
