import Video, { IVideo } from "src/models/Video";
import { applyPayouts } from "./payouts";
import processFeed from "./processFeed";

export default async function getSimilarVideos(video: IVideo, author: string) {
  const size = 25
  let videosByOthers = [];
  let query: any = {
    status: 'published',
    $or: [],
    owner: { $ne: author }
  };
  if (video.language !== '') {
    query.language = video.language;
  }
  if (video.category !== '') {
    query.$or.push({ category: video.category });
  }
  if (video.tags) {
    query.$or.push(
      ...(
        video.tags
          .split(',')
          .map((tag: string) => ({ 'tags_v2': tag }))
      )
    )
  }
  return await applyPayouts(
    {
      videos: processFeed(
        await Video.aggregate([{ $match: query }, { $sample: { size } }])
      )
    }  );
}
