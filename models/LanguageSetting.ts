import mongoose from 'mongoose';

export type Languages = 'en' | 'de' | 'fr' | 'es' | 'nl' | 'ko' | 'ru' | 'hu' | 'ro' | 'cs' | 'pl' | 'in' | 'bn'

export interface ILanguageSettings {
  userId: string;
  languages: Languages[];
}

const LanguageSettingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  languages: {
    type: [String],
    required: true,
    default: [
      'en',
      'de',
      'fr',
      'es',
      'nl',
      'ko',
      'ru',
      'hu',
      'ro',
      'cs',
      'pl',
      'in',
      'bn',
    ],
  },
});

export default mongoose.models.LanguageSetting ||
  mongoose.model<ILanguageSettings>('LanguageSetting', LanguageSettingSchema);
