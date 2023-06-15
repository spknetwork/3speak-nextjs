// import dbConnect from 'lib/dbConnect';
import { IVideo } from "src/models/Video";
import React, { useState } from "react";
import { VideoCard } from "src/components/VideoCard";
import { Grid, Row } from "src/components/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
// import newcomerFeedGenerator from 'utils/getNewcomers';

// export async function getServerSideProps() {
//   await dbConnect();
//   const newcomers = await newcomerFeedGenerator({})
//   return {
//     props: { newcomers }
//   }
// }

export default function Newcomers({
  newcomers,
}: {
  newcomers: (IVideo & { payout: number })[];
}) {
  const [newcomerVideos, setVideos] = useState(newcomers);
  const [page, setPage] = useState(1);

  const getMoreVideos = async () => {
    fetch(
      `/api/newcomers?` +
        new URLSearchParams({
          page: `${page}`,
        })
    )
      .then((res) => res.json())
      .then((videos: (IVideo & { payout: number })[]) => {
        setPage(page + 1);
        setVideos([...newcomerVideos, ...videos]);
      });
  };

  return (
    <Grid>
      <h1>First Time Uploads</h1>
      <InfiniteScroll
        dataLength={newcomerVideos.length}
        next={getMoreVideos}
        hasMore={true}
        loader={<h3>Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <Row>
          {newcomerVideos.map((video: IVideo & { payout: number }) => (
            <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
          ))}
        </Row>
      </InfiniteScroll>
    </Grid>
  );
}
