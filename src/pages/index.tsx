import dbConnect from "../utils/dbConnect";
import homeFeedGenerator from "../utils/getHomepage";
import { IVideo } from "../models/Video";
import React from "react";
import { VideoCard } from "../components/VideoCard";
import { Grid, Row } from "../components/Grid";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getServerSideProps() {

  // await dbConnect();
  console.log('Got here')
  let homepageVideos: IVideo[] = await homeFeedGenerator()//languages);
  console.log('Got here 2')
  return {
    props: { homepageVideos },
  };
}

export default function Home({
  homepageVideos,
}: {
  homepageVideos: (IVideo & { payout: number })[];
}) {
  return (
    <Grid>
      <h1>New</h1>
      <Row>
        {homepageVideos.map((video: IVideo & { payout: number }) => (
          <VideoCard key={`${video.owner}/${video.permlink}`} {...video} />
        ))}
      </Row>
    </Grid>
  );
}
