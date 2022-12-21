import Video from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";

export default async function otherVideosByOwner(authorperm: {owner: string; permlink: string;}) {
  try {
    return await applyPayouts(
      {
        videos: processFeed(
          await Video.aggregate([
            {
              $match: {
                status: 'published',
                owner: authorperm.owner,
                permlink: { $ne: authorperm.permlink }
              }
            },
            {
              $sample: {
                size: 5
              }
            }
          ])
        )
      }    );
  } catch {
    return []
  }
} 