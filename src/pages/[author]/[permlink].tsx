import React from "react";
import JWPlayer from 'react-jw-player';
import dbConnect from "@/utils/dbConnect";
import { GetServerSidePropsContext } from "next";
import { Col, Grid, Row } from "src/components/Grid";
import Link from "next/link";
import { SuggestedVideoCard } from "src/components/SuggestedVideoCard";
import { VoteCommentPayout } from "src/components/VoteCommentPayout";
import { Subscribe } from "src/components/Subscribe";
import { getFollowerInfo, getReplies } from "@/utils/hive";
import getVideo from "@/utils/getVideo";
import getSimilarVideos from "@/utils/getSimilarVideos";
import getOtherVideosByOwner from '@/utils/getOtherVideosByOwner';
import { IVideo } from "src/models/Video";
import CommentSection from "src/components/CommentSection";
import { Button } from "@mui/material";
import HiveMarkdown from "src/components/HiveMarkdown";

export async function getServerSideProps(context: GetServerSidePropsContext<{ author: string; permlink: string; }>) {
  await dbConnect();

  let { author, permlink } = context.params || {author: '', permlink: ''}
  author = author.replace('@', '')
  const authorperm = {owner: author, permlink}

  const video = await getVideo(authorperm);
  const otherVideosByOwner = await getOtherVideosByOwner(authorperm)
  const similarVideos = await getSimilarVideos(video, author)
  const followerInfo = await getFollowerInfo(video);
  const replies = await getReplies({author, permlink});

  return {
    props: { video, otherVideosByOwner, similarVideos, followerInfo, replies }
  }
}

const Watch = ({
  video,
  otherVideosByOwner,
  similarVideos,
  followerInfo,
  replies
}: {
  video: IVideo & {
    playUrl: string;
    community: string;
    upvotes: any[];
    downvotes: any[];
  };
  otherVideosByOwner: (IVideo & { payout: number; })[];
  similarVideos: (IVideo & { payout: number; })[];
  followerInfo: {
    count: number;
    following: boolean;
  };
  replies: any[]
}) => {
  return (
    <Grid>
      <Row>
        <Col size={2}>
          <JWPlayer
            playerId='video-player'
            file={video.playUrl}
            image={video.thumbUrl}
            playerScript='https://cdn.jwplayer.com/libraries/j7Kz0Rae.js'
          />
          <Row>
            <Col size={3} style={{paddingLeft: 10}}>
              <h3>{video.title}</h3>
              <Subscribe owner={video.owner} followerInfo={followerInfo} />
              <>{video.views} views{video.community ? (
              <> &#x2022; <Link href={`/c/${video.hive}`}><a>{video.community}</a></Link></>) : <></>}</>
            </Col>
            <Col size={1} style={{textAlign: 'right', paddingTop: 20}}>
              <VoteCommentPayout {...video} />
              <br /><br />
              <Button href={`/openDapp?uri=hive:${video.owner}:${video.permlink}`}>Open in the desktop app</Button>
            </Col>
          </Row>
          <Row>
            <HiveMarkdown>
              {video.description}
            </HiveMarkdown>
          </Row>
          <Row>
            <h1>Comments</h1>
            <CommentSection replies={replies} />
          </Row>
        </Col>
        <Col size={1} style={{paddingLeft: '10px'}}>
          {
            otherVideosByOwner.length ?
              <>
                <Link href={`/@${video.owner}`}><a><h4>More from {video.owner}</h4></a></Link>
                {otherVideosByOwner.map(videoFromOwner => (
                  <SuggestedVideoCard key={`${videoFromOwner.owner}/${videoFromOwner.permlink}`} {...videoFromOwner} />
                ))}
              </> : null
          }
          <h4>More Videos</h4>
          <>
            {
              similarVideos.map(videoFromOther => (
                <SuggestedVideoCard key={`${videoFromOther.owner}/${videoFromOther.permlink}`} {...videoFromOther} />
              ))
            }
          </>
        </Col>
      </Row>
    </Grid>
  );
};

export default Watch;
