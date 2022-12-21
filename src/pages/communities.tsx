import dbConnect from 'lib/dbConnect';
import homeFeedGenerator from 'utils/getHomepage';
import { IVideo } from "src/models/Video";
import React from 'react';
import { VideoCard } from 'src/components/VideoCard';
import { Grid, Row } from 'src/components/Grid';

export async function getServerSideProps() {
  await dbConnect();
  let homepageVideos: IVideo[] = await homeFeedGenerator()//languages);
  return {
    props: { homepageVideos }
  }
}

export default function Communities({ homepageVideos }: { homepageVideos: (IVideo & { payout: number; })[] }) {
  return (
    <Grid>
      <h1>Communities</h1>
      <Row>
        {homepageVideos.map((video: IVideo & { payout: number; }) => (
          <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
        ))}
      </Row>
    </Grid>
  )
}