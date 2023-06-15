import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const OpenDapp = () => {
  const router = useRouter();

  useEffect(() => {
    // window.location.href=`speak://#/watch/${router.query.uri}`
  });

  return (
    <>
      <h1>Haven&apos;t got the app yet?</h1>
      <h4>Download it here!</h4>
      {/* <Button href={'https://github.com/3speaknetwork/3Speak-app/releases/latest'}>Download</Button> */}
    </>
  );
};

export default OpenDapp;
