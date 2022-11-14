import dbConnect from 'lib/dbConnect';
import newFeedGenerator from 'utils/getNew';
import processFeed from 'utils/processFeed';
import { IVideo } from "models/Video";
import React, { useState } from 'react';
import { VideoCard } from 'components/VideoCard';
import { Grid, Row } from 'components/Grid';
import InfiniteScroll from "react-infinite-scroll-component";
import { applyPayouts } from '../utils/payouts';

export async function getServerSideProps() {
  await dbConnect();
  let created: IVideo[] = await newFeedGenerator({ languages: ['en'] })//languages);
  created = processFeed(created);
  created = await applyPayouts(created)
  return {
    props: { created }
  }
}

export default function New({ created }: { created: (IVideo & { payout: number; })[] }) {
  const [createdVideos, setVideos] = useState(created);
  const [page, setPage] = useState(1)

  const getMoreVideos = async () => {
    const lastVideo = createdVideos[createdVideos.length - 1]
    fetch(`/api/new?` + new URLSearchParams({
      page: `${page}`,
      lastVideo: `${lastVideo.owner}/${lastVideo.permlink}`
    }))
      .then((res) => res.json())
      .then((data: IVideo[]) => {
        applyPayouts(data).then(videos => {
          setPage(page + 1)
          setVideos([...createdVideos, ...videos]);
        })
      })
  };

  return (
    <Grid>
      <h1>New</h1>
      <InfiniteScroll
        dataLength={createdVideos.length}
        next={getMoreVideos}
        hasMore={true}
        loader={<h3>Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      ><Row>
        {createdVideos.map((video: IVideo & { payout: number; }) => (
          <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
        ))}
        </Row>
      </InfiniteScroll>
    </Grid>
  )
}