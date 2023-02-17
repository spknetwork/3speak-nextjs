import { IVideo } from "src/models/Video";
import { getPosts } from '../utils/hive';

function getPayoutFromMetadata(content: any) {
  let payout = content.last_payout <= "1970-01-01T00:00:00" ? content.pending_payout_value : parseFloat(content.total_payout_value) + parseFloat(content.curator_payout_value);
  return parseFloat(payout).toFixed(2);
}
export async function applyPayouts({
  videos,
  includeVotes = false,
  includeReplies = false,
}: {
  videos: (IVideo & { payout: number; upvotes: any[]; downvotes: any[]; })[];
  includeVotes?: boolean;
  includeReplies?: boolean;
}) {
  // const hivePosts: any[] = await getPosts(videos.map(v => ({ author: v.owner, permlink: v.permlink })));
  return formatChainData(videos, [], includeVotes, includeReplies);
}

export const formatChainData = (applyTo: any[], hivePosts: any[], includeVotes = false, includeReplies = false) => hivePosts.map((post, index) => ({
  ...applyTo[index],
  payout: getPayoutFromMetadata(post),
  upvotes: includeVotes ? post.active_votes.filter((vote: any) => vote.percent > 0).map((r: { rshares: number; }) => ({...r, payout: payoutHelper.voteValue(r, post)})) : null,
  downvotes: includeVotes ? post.active_votes.filter((vote: any) => vote.parcent < 0).map((r: { rshares: number; }) => ({...r, payout: payoutHelper.voteValue(r, post)})) : null,
  replies: includeReplies ? post.replies : null
}))

const payoutHelper = {
  totalPostPayout: (post: { payout: any; }) => {
    return post.payout
  },
  totalRshares: (post: { active_votes: any[]; }) => {
    return post.active_votes.reduce((a, b) => a + parseFloat(b.rshares), 0)
  },
  ratio: (post: any) => {
    return payoutHelper.totalPostPayout(post) / payoutHelper.totalRshares(post) || 0
  },
  voteValue: (vote: { rshares: number; }, post: any) => {
    const ratio = payoutHelper.ratio(post)
    return vote.rshares * ratio
  }
}
