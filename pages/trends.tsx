import dbConnect from 'lib/dbConnect';
import trendingFeedGenerator from 'utils/getTrending';
import processFeed from 'utils/processFeed';
import { IVideo } from "models/Video";
import React, { useState } from 'react';
import { VideoCard } from 'components/VideoCard';
import { Grid, Row } from 'components/Grid';
import { getPosts } from 'utils/hive';
import InfiniteScroll from "react-infinite-scroll-component";

function getPayoutFromMetadata(content: any) {
  let payout = content.last_payout <= "1970-01-01T00:00:00" ? content.pending_payout_value : parseFloat(content.total_payout_value) + parseFloat(content.curator_payout_value)
  payout = parseFloat(payout)
  payout = payout.toFixed(2)
  return payout
}

async function applyPayouts(videos: (IVideo)[]) {
  const hivePosts: any[] = await getPosts(videos.map(v => ({ author: v.owner, permlink: v.permlink })))
  return hivePosts.map((post: IVideo, index) => ({
    ...videos[index],
    payout: getPayoutFromMetadata(post)
  }))
}

export async function getServerSideProps() {
  await dbConnect();
  let trending = await trendingFeedGenerator({ languages: ['en'] })//languages);
  trending = await applyPayouts(trending)
  return {
    props: { trending }
  }
}

export default function Trending({ trending }: { trending: (IVideo & { payout: number; })[] }) {
  const [trendingPosts, setPosts] = useState(trending);
  const [page, setPage] = useState(1)

  const getMoreVideos = async () => {
    fetch(`/api/trending?` + new URLSearchParams({
      page: `${page}`
    }))
      .then((res) => res.json())
      .then((data: IVideo[]) => {
        applyPayouts(data).then(videos => {
          setPage(page + 1)
          setPosts([...trendingPosts, ...videos]);
        })
      })
  };

  return (
    <Grid>
      <h1>Trending</h1>
      <InfiniteScroll
        dataLength={trendingPosts.length}
        next={getMoreVideos}
        hasMore={true} // TODO: trending can end when 7 days of content has been accessed
        loader={<h3>Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      ><Row>
        {trendingPosts.map((video: IVideo & { payout: number; }) => (
          <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
        ))}
        </Row>
      </InfiniteScroll>
    </Grid>
  )
}