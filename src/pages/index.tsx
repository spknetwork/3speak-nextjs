import dbConnect from '../utils/dbConnect';
import homeFeedGenerator from '../utils/getHomepage';
import { IVideo } from "../models/Video";
import React from 'react';
import { VideoCard } from '../components/VideoCard';
import { Grid, Row } from '../components/Grid';

export async function getServerSideProps() {
  await dbConnect();
  let homepageVideos: IVideo[] = await homeFeedGenerator()//languages);
  return {
    props: { homepageVideos }
  }
}

export default function Home({ homepageVideos }: { homepageVideos: (IVideo & { payout: number; })[] }) {
  return (
    <Grid>
      <h1>New</h1>
      <Row>
        {homepageVideos.map((video: IVideo & { payout: number; }) => (
          <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
        ))}
      </Row>
    </Grid>
  )
}