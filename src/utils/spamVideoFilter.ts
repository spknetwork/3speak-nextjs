import { IVideo } from "src/models/Video";

const config = {
  max_per_author: 3
};

export default function (videos: IVideo[], authorVideoCount: {[key: string]: number} = {}) {

  function getAuthorVideoCount(author: string) {
    return authorVideoCount[author] || 0
  }

  function incrementAuthorVideoCount(author: string) {
    if (!(author in authorVideoCount)) {
      authorVideoCount[author] = 0
    }
    authorVideoCount[author] += 1
  }

  return videos.filter((video) => {
    if (getAuthorVideoCount(video.owner) >= config.max_per_author) {
      return false;
    }
    incrementAuthorVideoCount(video.owner)
    return true
  })
}

