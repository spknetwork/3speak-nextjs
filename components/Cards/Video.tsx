/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import DateTime from "date-and-time";
import { FaUser } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import convert from "convert-units";
import IpfsLogo from "../../public/ipfs-logo-vector-ice.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { Box } from "components/Box";

export function Video(props: any) {
  const [hovering, setHovering] = useState(false);

  return (
    <div>
      <ThumbnailContainer
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {!hovering && (
          <>
            <PlayIconViews>
              <BsPlayFill />
              <span>{props.views}</span>
            </PlayIconViews>
            <VideoTime>
              {(() => {
                const pattern = DateTime.compile("mm:ss");
                return DateTime.format(
                  new Date(props.duration * 1000),
                  pattern
                );
              })()}
            </VideoTime>
          </>
        )}
        <Link href={`/watch?v=${props.author}/${props.permlink}`}>
          <img
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "13em",
            }}
            className="img-fluid bg-dark"
            src={props.images.thumbnail}
          />
        </Link>
      </ThumbnailContainer>
      <Link href={`/watch?v=${props.author}/${props.permlink}`}>
        <Title
          data-toggle="tooltip"
          data-placement="bottom"
          title={props.title}
          data-original-title={props.title}
        >
          {props.title.split("").length > 25
            ? `${props.title.substring(0, 25)}...`
            : props.title}
        </Title>
      </Link>
      <Box marginTop="7px">
        <span className="black_col">
          <a href={`/user/${props.author}`}>
            {" "}
            <FaUser width="10px" /> {props.author}
          </a>
        </span>
        <br />
        <span>
          {(() => {
            const dateBest = convert(
              new Date().getTime() - (new Date(props.created) as any) / 1
            )
              .from("ms")
              .toBest();
            if (Math.round(dateBest.val) >= 2) {
              return `${Math.round(dateBest.val)} ${dateBest.plural} ago`;
            } else {
              return `${Math.round(dateBest.val)} ${dateBest.singular} ago`;
            }
          })()}
        </span>
        {props.isIpfs ? (
          <div className="card-label" style={{ right: "10px", bottom: "25px" }}>
            <OverlayTrigger
              overlay={
                <Tooltip id="video-available">Video available on IPFS</Tooltip>
              }
            >
              <img className="play_i" src={IpfsLogo} height="17px" />
            </OverlayTrigger>
          </div>
        ) : null}
      </Box>
    </div>
  );
}

const Title = styled.a`
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
`;

const PlayIconViews = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  background: #e8e8e8 none repeat scroll 0 0;
  border-radius: 5px;
`;

const VideoTime = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;
  background: #e8e8e8 none repeat scroll 0 0;
  border-radius: 5px;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  height: 110px;
  border: 3px solid #222;
  cursor: pointer;
`;