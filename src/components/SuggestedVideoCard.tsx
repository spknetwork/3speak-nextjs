import { IVideo } from "src/models/Video";
import Link from "next/link";
import timeSince from "../utils/timeSince";
import { Col, Row } from "./Grid";

export const SuggestedVideoCard = (video: IVideo & {payout: number;}) => {
  return (
    <Row>
      <Col size={1}>
        <Link href={`/@${video.owner}/${video.permlink}`}><a>
          <img src={video.thumbUrl} style={{width: '100%'}} />
        </a></Link>
      </Col>
      <Col size={3} style={{paddingLeft: '10px'}}>
        <Link href={`/@${video.owner}/${video.permlink}`}><a>
          <b>{video.title}</b>
        </a></Link>
        <br />
        <Link href={`/@${video.owner}`}><a>
          {video.owner}
        </a></Link>
        <br />
        <Link href={`/@${video.owner}/${video.permlink}`}><a>
          {video.views} views &#x2022; {timeSince(new Date(video.created))} &#x2022; ${video.payout}
        </a></Link>
      </Col>
    </Row>
  )
}