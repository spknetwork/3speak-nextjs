import { IVideo } from "models/Video";
import { getPosts } from 'utils/hive';

function getPayoutFromMetadata(content: any) {
  let payout = content.last_payout <= "1970-01-01T00:00:00" ? content.pending_payout_value : parseFloat(content.total_payout_value) + parseFloat(content.curator_payout_value);
  payout = parseFloat(payout);
  payout = payout.toFixed(2);
  return payout;
}
export async function applyPayouts(videos: (IVideo)[]) {
  const hivePosts: any[] = await getPosts(videos.map(v => ({ author: v.owner, permlink: v.permlink })));
  return hivePosts.map((post: IVideo, index) => ({
    ...videos[index],
    payout: getPayoutFromMetadata(post)
  }));
}
