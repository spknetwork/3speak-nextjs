import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import CID from "cids";
import { AccountService } from "services/account.service";

const WatchVideo = () => {
  const { v } = useRouter().query;
  const [user, permlink] = useMemo(
    () => (v ? (v as string).split("/") : ["psorigins", "ewuhhqmt"]),
    [v]
  );

  const [videoInfo, setVideoInfo] = useState<any>({});
  const [postInfo, setPostInfo] = useState<any>({});

  console.log(user, permlink);

  return <div>WatchVideo</div>;
};

export default WatchVideo;
