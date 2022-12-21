import { Languages } from "src/models/LanguageSetting";
import Video, { IVideo } from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";

export default async function getNewFeed({
  page = 0,
  limit = 50
}: {
  page?: number
  limit?: number
  languages?: Languages[],
  lastVideo?: { author: string; permlink: string; };
}) {
  const skip = page * limit

  let newbies: IVideo[] = await Video.find({
    status: 'published',
    firstUpload: true,
    owner: { $ne: 'guest-account' }
  }, null, { limit, skip }).sort('-created')//.cache(300);
  
  return await applyPayouts({ videos: processFeed(newbies) });
}
