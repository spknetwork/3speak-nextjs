import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

var hive = require("@hiveio/hive-js");
var axios = require("axios");
var FormData = require("form-data");
// var dhive = require("@hiveio/dhive");
// var dhiveclient = new dhive.Client(["https://api.hive.blog"]);
const dotenv = require("dotenv");
dotenv.config();
// const BASE_URL = "https://staging.3speak.tv";
const BASE_URL = "http://localhost:4569";

// var tus = require("tus-js-client");
// const fs = require("fs");

type Props = {};

const ExamComp = (props: Props) => {

    const [videoId, setVideoId] = useState("")
    const [uploadId, setUploadId] = useState("")
    const [permLink, setPermLink] = useState("")
    

  //function for generating the proof of payload
  function generateProofOfPayload() {
    const WIF = process.env.POSTING_KEY;
    const payload = {
      account: "piyushjha",
      ts: parseInt(Date.now().toString()),
    };
    const proof_payload = JSON.stringify(payload);
    const proof = hive.auth.signMessage(proof_payload, WIF); //err
    console.log(`Signed Proof:\n${proof}, Proof: ${proof_payload}`);
    return [proof, proof_payload];
  }

  //function for handle login singleton
  const handleLogin = async () => {
    const pop = generateProofOfPayload();
    console.log("Proof of payload", pop[1]);
    console.log("Proof of payload", pop[0]);

    const { data: dataLogin } = await axios.post(
      `${BASE_URL}/api/v1/auth/login_singleton`,
      {
        username: "piyushjha",
        network: "hive",
        authority_type: "posting",
        proof_payload: pop[1],
        proof: pop[0],
      }
    ); 
    console.log("access_token", dataLogin.access_token);
    localStorage.setItem("access_token", dataLogin.access_token)
  };

  async function handleCheckApi() {
    const token = localStorage.getItem("access_token");
    const { data: data2 } = await axios.get(`${BASE_URL}/api/v1/upload/create_upload`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log(data2);
    setVideoId(data2.video_id);
    setUploadId(data2.upload_id)
    setPermLink(data2.permLink)
}

  /**
   * This function includes handle encode api "/upload/start_encode"
   * @req {upload_id}
   * @returns status 201 code
   * TODO
   */

const handleEncode = (): void => {
    // set encoding video
    const req = {
      upload_id: upload_id,
    };
    const token = localStorage.getItem("access_token");
    axios
      .post(`${BASE_URL}/api/v1/upload/start_encode`, req, {
        //the token has to be genuine because it would search in the db for it
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          position: "top-right",
          title: "Success!",
          description: "Encoding video, please wait",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/studio/studio_videos");
      })
      .catch((error) => {
        toast({
          position: "top-right",
          title: "Error!",
          description: "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  
  /**
   * function for updating the upload data
   * @params
   * @returns {status 201 code}
   */
  const handleUpdate = async () => {
    const token = localStorage.getItem("access_token");
    axios
      .post(
        `${BASE_URL}/api/v1/upload/update_post`,
        {
          video_id: video_id,
          permlink: permLink,
          title: "This is a test upload done by @sagarkothari88 on 4-apr-2024",
          body: "Testing Acela Code App Development. @vaultec & @sagarkothari88 testing video upload using acela-core",
          tags: ["threespeak", "sagarkothari88", "test", "mobileapp", "dev"],
          community: "hive-181335",
          beneficiaries: "[]",
          language: "en",
          originalFilename: "test.mp4",
          filename: fileIdentifier,
          size: 39845888,
          duration: 738,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {});
  };

  
  return (
    <div>
      <Button onClick={handleLogin}>
        Click me for getting the access token!
      </Button>
      <Button onClick={handleCheckApi}>
        Create Upload
      </Button>
    </div>
  );
};

export default ExamComp;
