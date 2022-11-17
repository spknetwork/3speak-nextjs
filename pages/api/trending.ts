import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import trendingFeedGenerator from 'utils/getTrending';
import processFeed from 'utils/processFeed';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const {
    query: {
      page
    }
  } = req

  // TODO: uncomment
  //let languages = await getLanguageSettings(req);

  let trending = await trendingFeedGenerator({page: Number(page), languages: ['en']})// TODO: languages
  res.send(trending)
}
