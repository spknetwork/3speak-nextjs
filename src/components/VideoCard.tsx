import { IVideo } from "src/models/Video";
import Link from "next/link";
import { Box } from "./Box";
import { VideoCol } from "./Grid";
import styled from "styled-components";
import timeSince from "../utils/timeSince";

export const TextCutoff = styled.div`
  text-overflow: "ellipsis";
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  line-height: 1.8em;
`;

export const VideoCard = (props: IVideo & { payout: number }) => {
  return (
    <VideoCol size={1} style={{ margin: "5px 5px" }}>
      <Box style={{ width: 340 }}>
        <Link href={`/@${props.owner}/${props.permlink}`}>
          <a>
            <img
              style={{
                width: "100%",
                border: "5px solid #555",
                maxHeight: "200px",
                objectFit: "cover",
              }}
              src={
                "https://ipfs.3speak.tv/ipfs/" + props.thumbnail.split("://")[1]
              }
              alt={`${props.owner}'s photo for the video titled ${props.title}`}
            />
          </a>
          {/* TODO: Use the next Image component here (weird it requires a pixel with) */}
        </Link>
        <div>
          <TextCutoff>
            <Link href={`/@${props.owner}/${props.permlink}`}>
              <a>{props.title}</a>
            </Link>
          </TextCutoff>
        </div>
      </Box>

      <b>
        <Link href={`/@${props.owner}`}>
          <a>@{props.owner}</a>
        </Link>
      </b>
      <div>{timeSince(new Date(props.created))}</div>
      <div>
        <b>${props.payout}</b>
      </div>
    </VideoCol>
  );
};
