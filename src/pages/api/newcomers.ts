import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from 'lib/dbConnect';
// import newcomerFeedGenerator from 'utils/getNewcomers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await dbConnect();

  const {
    query: { page },
  } = req;

  // res.send(await newcomerFeedGenerator({page: Number(page)}))
}
