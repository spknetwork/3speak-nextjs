import { getCommunity } from "./hive";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";
import Video from 'src/models/Video'

export default async function getVideo(authorperm: { owner: string; permlink: string; }) {
  let video = await Video.findOne(authorperm, '-_id', {lean: 'toObject'})
  if (!video) {
    return {
      notFound: true,
    };
  }
  video = processFeed(
    await applyPayouts({
      videos: [
        video
      ],
      includeVotes: true,
      includeReplies: true
    })
  )[0];
  video.community = (await getCommunity(video))?.title || null

  return video
}