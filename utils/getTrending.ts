import dbConnect from "lib/dbConnect";
import { Languages } from "models/LanguageSetting";
import Video from "models/Video";

const config = {
  max_per_author: 3
};

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
  await dbConnect();

  const skip = limit * page

  const author_video_count: {[key: string]: number} = {};

  function getAuthorVideoCount(author: string) {
    return author_video_count[author] || 0
  }

  function incrementAuthorVideoCount(author: string) {
    if (!(author in author_video_count)) {
      author_video_count[author] = 0
    }
    author_video_count[author] += 1
  }

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

  let feed = [];

  if (getPinned) {
    const pinned = await Video.find(Object.assign({
      status: 'published',
      pinned: true
    }, query), null, {limit: 5}).sort('-created')//.cache(30);
    feed = pinned
  }
  
  feed.forEach(v => {
    incrementAuthorVideoCount(v.owner)
  })

  for (const video of trending) {
    if (getAuthorVideoCount(video.owner) >= config.max_per_author) {
      continue
    }
    if (feed.length < limit) {
      feed.push(video);
      incrementAuthorVideoCount(video.owner)
    }
  }

  return feed.map(r => (r.toObject()))
}
