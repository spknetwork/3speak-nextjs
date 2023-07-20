import React from "react";
import ReactJWPlayer from "react-jw-player";

const VideoPlayer = () => {
  return (
    <ReactJWPlayer
      licenseKey="64HPbvSQorQcd52B8XFuhMtEoitbvY/EXJmMBfKcXZQU2Rnn"
      customProps={{
        playbackRateControls: true,
        autostart: false,
      }}
      file={
        "https://ipfs-3speak.b-cdn.net/ipfs/QmWoqdoLtsF4obB5sfSUc3GEZGY87TmcJrt6JpH8bJqsuK/manifest.m3u8"
      }
      image={
        "https://ipfs-3speak.b-cdn.net/ipfs/bafybeibqxbf652lmfbdf7zoht3pbhkx4m76agdwn5mnw33vjhlxrzvccoe/"
      }
      id="botr_UVQWMA4o_kGWxh33Q_div"
      playerId={"1242424242"}
      playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
    ></ReactJWPlayer>
  );
};

export default VideoPlayer;
