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
  video['upvotes'] = []
  video['downvotes'] = []
  video['replies'] = []
  video = processFeed(
    // await applyPayouts({
    //   videos: [
    //     video
    //   ],
    //   includeVotes: true,
    //   includeReplies: true
    // })
    [video]
  )[0];
  console.log('22', video)
  // video.community = (await getCommunity(video))?.title || null

  return video
}