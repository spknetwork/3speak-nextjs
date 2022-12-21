import Language from 'src/models/Language';
import LanguageSetting, { ILanguageSettings, Languages } from 'src/models/LanguageSetting';
import { ILanguage } from 'src/models/Language';
import { NextApiRequest } from 'next';
import { HydratedDocument } from 'mongoose';

// TODO: get user information from request and uncomment the usage of this function

export async function getLanguageSettings(req: NextApiRequest): Promise<Languages[]> {
  // var langs: ILanguage[] = await Language.find(); //.cache(30);
  // if (!req.user) {
  //   return langs.map((lang) => lang.code);
  // }

  // const existingLanguageSetting: ILanguageSettings | null = await LanguageSetting.findOne({
  //   userId: req.user.user_id,
  // }); //.cache(30);
  // if (existingLanguageSetting) {
  //   return existingLanguageSetting.languages;
  // }

  // const newLanguageSetting: HydratedDocument<ILanguageSettings> = new LanguageSetting({
  //   userId: req.user.user_id,
  // });
  // newLanguageSetting.save();
  return [] // newLanguageSetting.languages;
}
