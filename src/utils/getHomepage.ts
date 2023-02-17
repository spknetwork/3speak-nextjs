import Subscription from "src/models/Subscription";
import Video from "src/models/Video";
import dbConnect from "./dbConnect";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";

export default async function getHomepageFeed() {
  await dbConnect()
  console.log('Pre run 7')
  const pinned = await Video.find({
    status: 'published',
    pinned: true
  }, null, { limit: 75 }).sort('-created');
  console.log('Pre run 11')

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
  console.log('applying payouts')
  return applyPayouts({ videos: processFeed(feed) })
}
