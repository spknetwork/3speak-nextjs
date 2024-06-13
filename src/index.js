var hive = require("@hiveio/hive-js");
var axios = require("axios");
var FormData = require("form-data");
// var dhive = require("@hiveio/dhive");
// var dhiveclient = new dhive.Client(["https://api.hive.blog"]);
const dotenv = require("dotenv");
dotenv.config();


var tus = require("tus-js-client");
const fs = require("fs");

const UPLOAD_URL = "http://127.0.0.1:1080/files";
// const API_URL = "http://localhost:4569";
const API_URL = "https://staging.3speak.tv";


// import { Client } from "@hiveio/dhive";
// const client = new Client(["https://api.hive.blog"]);

function validateHiveKey(account, userKey) {
  hive.api
    .getAccountsAsync([account])
    .then(function (accounts) {
      const publicPosting = accounts[0].posting.key_auths[0][0];
      const publicActive = accounts[0].active.key_auths[0][0];
      const publicMemo = accounts[0].memo_key;
      const isItPostingKey = hive.auth.wifIsValid(userKey, publicPosting);
      const isItActiveKey = hive.auth.wifIsValid(userKey, publicActive);
      const isItMemoKey = hive.auth.wifIsValid(userKey, publicMemo);
      // const noKey = !isItPostingKey && !isItActiveKey && !isItMemoKey;
      const keyType = isItPostingKey
        ? "posting"
        : isItActiveKey
        ? "active"
        : isItMemoKey
        ? "memo"
        : "";
      console.log(keyType);
    })
    .catch(function (err) {
      console.log("Error: ", err);
    });
}

function generateProofOfPayload() {
  const payload = {
    account: "piyush0409",
    ts: parseInt(Date.now()),
  };
  const proof_payload = JSON.stringify(payload);
  const proof = hive.auth.signMessage(proof_payload, "5KEsWRmxGPtPhtL2uuo8TKzmGfSsCZeyuchaU4XrGhQqsmqxoxu");
  console.log(`Signed Proof:\n${proof}, Proof: ${proof_payload}`);
  return [proof, proof_payload];
}

async function startUpload(video_id, upload_id) {
  return await new Promise((resolve, reject) => {
    const file = "./test.mp4";
    const data = fs.readFileSync(file);
    const upload = new tus.Upload(data, {
      endpoint: UPLOAD_URL,
      metadata: {
        video_id: video_id,
        upload_id: upload_id,
        filename: "test.mp4",
        filetype: "video/mp4",
      },
      onError: function (error) {
        console.log("Failed because: " + error);
        reject(error);
      },
      onSuccess: function () {
        console.log("Download from %s", upload.url);
        resolve(upload.url);
      },
      onProgress: function (progress) {
        console.log(`uploaded ${progress}`);
      },
    });
    upload.start();
  });
}

async function start() {
  // Step 1. Generate Proof of payload
  const pop = generateProofOfPayload();
  console.log("pop", pop)
  // Step 2. Log in
  const { data: dataLogin } = await axios.post(
    `https://staging.3speak.tv/api/v1/auth/login/singleton`,
    {
      username: "piyush0409",
      network: "hive",
      authority_type: "posting",
      proof_payload: pop[1],
      proof: pop[0],
    }
  );
  console.log(dataLogin);

  // Step 3. Create Upload
  const { data: data2 } = await axios.get(`${API_URL}/api/v1/upload/create_upload`,  {
      headers: {
        Authorization: `Bearer ${dataLogin.access_token}`,
      }
    }
  );
  console.log(data2);

  // Step 4. Upload a video
  const uploadedUrl = await startUpload(data2.video_id, data2.upload_id);
  console.log(`uploaded url is - ${uploadedUrl}`);
  const uploadedUrlArray = uploadedUrl.split('/');
  const fileIdentifier = uploadedUrlArray[uploadedUrlArray.length-1];

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Step 5. Upload a thumbnail
  const form = new FormData();
  form.append("file", fs.createReadStream("./thumbnail.jpg"));
  form.append("video_id", data2.video_id);

  try {
    const responseData = await axios.post(
      `${API_URL}/api/v1/upload/thumbnail`,
      form,
      {
        headers: {
          Authorization: `Bearer ${dataLogin.access_token}`,
          ...form.getHeaders(),
        },
      }
    );
    console.log(`upload thumbnail response - ${responseData}`);

    // Step 6. Update post
  const { data: data6 } = await axios.post(
    `${API_URL}/api/v1/upload/update_post`,
    {
      video_id: data2.video_id,
      permlink: data2.permlink,
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
        Authorization: `Bearer ${dataLogin.access_token}`,
      },
    }
  );

    const { data: data3 } = await axios.post(
      `${API_URL}/api/v1/upload/start_encode`,
      {
        video_id: data2.video_id, 
        upload_id: data2.upload_id,
        permlink: data2.permlink,
      },
      {
        headers: {
          Authorization: `Bearer ${dataLogin.access_token}`,
        },
      }
    );
    console.log(data3);
  } catch (e) {
    console.log(e);
  }
}

start();
