import { Languages } from "src/models/LanguageSetting";
import Video, { IVideo } from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";
import spamVideoFilter from "./spamVideoFilter";

export default async function getNewFeed({
  page = 0,
  limit = 50,
  languages = ['en'],
  lastVideo
}: {
  page?: number
  limit?: number
  languages?: Languages[],
  lastVideo?: { author: string; permlink: string; };
}) {
  const skip = page * limit

  let created = await Video.find({
    status: 'published',
    language: {$in: languages}
  }, null, {limit, skip}).sort({ created: -1 })//.cache(30)

  if (lastVideo) {
    const indexOfLastVideo = created.indexOf((video: IVideo) => video.owner === lastVideo.author && video.permlink === lastVideo.permlink)
    created = created.slice(indexOfLastVideo + 1, created.length)
  }
  
  return await applyPayouts({ videos: processFeed(spamVideoFilter(created)) });
}
