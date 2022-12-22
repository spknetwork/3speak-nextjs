import dbConnect from '../utils/dbConnect';
import trendingFeedGenerator from '../utils/getTrending';
import { IVideo } from "../models/Video";
import React, { useState } from 'react';
import { VideoCard } from '../components/VideoCard';
import { Grid, Row } from '../components/Grid';
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps() {
  await dbConnect();
  let trending = await trendingFeedGenerator({ languages: ['en'] })//languages);
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
      .then((videos: (IVideo & { payout: number; })[]) => {
        setPage(page + 1)
        setPosts([...trendingPosts, ...videos]);
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