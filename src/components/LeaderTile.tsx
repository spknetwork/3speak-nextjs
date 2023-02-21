import React, { useEffect, useMemo, useState } from "react";
import RefLink from "./RefLink";

export interface LeaderTileProps {
  info: {
    score: number;
    rank: number;
  };
  reflink: string;
}

export function LeaderTile(props: LeaderTileProps) {
  const reflink = useMemo(() => {
    return RefLink.parse(props.reflink);
  }, [props.reflink]);

  const [profilePicture, setProfilePicture] = useState("");
  const [borderLeftCode, setBorderLeftCode] = useState("");

  useEffect(() => {
    const load = async () => {
      console.log(`displaying leader tile`, props);
      let color: string = "";
      switch (props.info.rank) {
        case 1: {
          color = "#d4af37 solid 6px";
          break;
        }
        case 2: {
          color = "#bec2cb solid 6px";
          break;
        }
        case 3: {
          color = "#b08d57 solid 6px";
          break;
        }
      }
      console.log("props.reflink");
      console.log(props.reflink.split("hive:"));

      setProfilePicture(
        `https://images.hive.blog/u/${props.reflink.split("hive:")[1]}/avatar`
      );
      setBorderLeftCode(color);
    };

    void load();
  }, []);

  return (
    <div
      className="channels-card card pt-4"
      style={{ borderLeft: borderLeftCode }}
    >
      <div className="card-body">
        <div className="channels-card-image text-center">
          <a href={`#/user/${props.reflink.toString()}`}>
            <img
              className="img-fluid shadow-sm rounded-circle mb-2 w-80"
              src={profilePicture}
              alt=""
            />
          </a>
          <div className="channels-card-image-btn my-2">
            <a
              href={`#/user/${reflink.toString()}`}
              className="btn btn-outline-default btn-sm border shadow-sm text-dark"
            >
              View Channel
            </a>
          </div>
        </div>
        <div className="channels-card-body text-center ">
          <div className="channels-title">
            <a
              className="text-decoration-none text-dark"
              href={`#/user/${reflink.toString()}`}
            >
              {reflink.root}
            </a>
          </div>
          <div>
            <i></i>
          </div>
        </div>
        <div className="channels-card-rank badge rounded-pill text-bg-dark text-white fs-75">
          Rank: {props.info.rank}
        </div>
        <div className="channels-card-score badge rounded-pill text-bg-dark text-white text-sm-start fs-75">
          Score: {Math.round(props.info.score)}
        </div>
      </div>
    </div>
  );
}
