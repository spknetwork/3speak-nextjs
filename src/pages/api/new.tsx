import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import newFeedGenerator from '../../utils/getNew';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const {
    query: {
      page,
      lastVideo
    }
  } = req

  // TODO: uncomment
  //let languages = await getLanguageSettings(req);
  const lastVideoSplit = (lastVideo as string).split('/')
  const lastVideoMap = {
    author: lastVideoSplit[0],
    permlink: lastVideoSplit[1]
  }
  
  res.send(await newFeedGenerator({page: Number(page), languages: ['en'], lastVideo: lastVideoMap}))
}
