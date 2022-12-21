import Subscription from "src/models/Subscription";
import Video from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";

export default async function getHomepageFeed() {
  const pinned = await Video.find({
    status: 'published',
    pinned: true
  }, null, { limit: 750 }).sort('-created');

  let user: any;
  let feed = []
  if (user?.user_id) {
    let subs = await Subscription.find({ userId: user.user_id }); //TODO: user information
    let subchannels = subs.map(sub => sub.channel);

    feed = pinned.concat(await Video.find({
      status: 'published',
      pinned: false,
      $or: [{ recommended: true }, { owner: { $in: subchannels } }]
    }, null, { limit: 66 }).sort('-created'))
  } else {
    feed = pinned.concat(await Video.find({
      recommended: true,
      pinned: false,
      status: 'published'
    }).sort('-created').limit(66));
  }
  return applyPayouts({ videos: processFeed(feed) })
}
