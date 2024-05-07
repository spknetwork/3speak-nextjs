import { Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    title: string;
    author?: {
        username: string;
    }
    permlink: string;
}

const VideosTitle = (props: Props) => {
  const router = useRouter();
  const redirectWatchPage = () => {
    router.push(`/watch?v=${props.author?.username}/${props.permlink}`)
  }
  return (
    <div>
      <Text
        onClick={() => redirectWatchPage()}
        css={css`
          cursor: pointer;
          font-weight: bold;
          font-size: 13px;
          overflow-wrap: break-word;
          text-overflow: ellipsis;
          word-wrap: break-word;
          overflow: hidden;
          max-height: 2.8em;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        `}
        fontSize={"13px"}
        fontWeight={"bold"}
        marginY={"10px"}
        as="h3"
        textOverflow={"ellipsis"}
        overflow={"hidden"}
        maxHeight={"6.8rem"}
        overflowWrap={"break-word"}
      >
        {props.title}
      </Text>
    </div>
  );
};

export default VideosTitle;
