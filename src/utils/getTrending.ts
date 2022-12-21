import { Languages } from "src/models/LanguageSetting";
import Video from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";
import spamVideoFilter from "./spamVideoFilter";

export default async function getTrendingFeed({
  languages = ['en'],
  page = 0,
  limit = 50,
  query = {},
  getPinned = true
}: {
  languages?: Languages[];
  page?: number;
  limit?: number;
  query?: any;
  getPinned?: boolean;
}) {
  const skip = limit * page

  var today = new Date();
  var lastWeekStart = today.setDate(today.getDate() - 7);

  const trending = await Video.find(Object.assign({
    status: 'published',
    // TODO: this needs uncommenting in prod
    //created: {$gt: lastWeekStart},
    language: {$in: languages},
    score: {$gt: 0},
    pinned: false
  }, query), null, {limit, skip}).sort('-score')//.cache(30);

  // TODO: enable caching

  let pinned = [];

  if (getPinned) {
    pinned = await Video.find(Object.assign({
      status: 'published',
      pinned: true
    }, query), null, {limit: 5}).sort('-created')//.cache(30);
  }

  return await applyPayouts({
    videos: processFeed(spamVideoFilter([
      ...pinned.map(r => (r.toObject())),
      ...trending.map(r => (r.toObject()))
    ]))
  })
}
