import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from '../utils/dbConnect';
// import trendingFeedGenerator from '../utils/getTrending';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await dbConnect();

  const {
    query: { page },
  } = req;

  // TODO: uncomment
  //let languages = await getLanguageSettings(req);
  //
  // res.send(await trendingFeedGenerator({page: Number(page), languages: ['en']}))
}
