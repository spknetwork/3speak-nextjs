//TODO: to look into this for module not found error

import { Aioha, initAioha, Asset, KeyTypes, Providers } from "@aioha/aioha";
import { Authenticator, AuthInfo } from "./types";
import { AxiosRequestConfig } from "axios";

const aioha =
  typeof window === "undefined"
    ? new Aioha()
    : initAioha({
        hiveauth: {
          name: "3Speak",
          // description: "Aioha test app",
        },
        hivesigner: {
          app: "3speak.tv",
          callbackURL: window.location.origin + "/hivesigner.html", // TODO set properly
          scope: ["login", "vote"],
        },
      });

function generatePayload(account: string) {
  const payload = {
    ts: Date.now(),
    account,
  };
  const serializedPayload = JSON.stringify(payload);
  return {
    payload,
    serializedPayload,
  };
}

async function generateProofOfPayload(account: string) {
  const { payload, serializedPayload: message } = generatePayload(account);

  // const signature = privateKey.sign(
  //   crypto.createHash("sha256").update(message).digest()
  // );
  // TODO double check the message is signed with the message hash
  const signature = await aioha.signMessage(message, KeyTypes.Posting);
  if (!signature.success) {
    throw new Error(signature.error);
  }
  const proof = signature.result!;
  console.log(`Signed Proof:\n${proof}, Proof: ${message}`);
  return { proof, proof_payload: payload };
}

// // Step 2. Log in
// const { data: dataLogin } = await axios.post(
//   `https://staging.3speak.tv/api/v1/auth/login/singleton/hive`,
//   {
//     //   authority_type: "posting",
//     proof_payload: pop[1],
//     proof: pop[0],
//   }
// );

export const hive = {
  login(provider: Providers, username: string) {
    const { payload, serializedPayload } = generatePayload(username);
    return aioha
      .login(provider, username, {
        keyType: KeyTypes.Posting,
        msg: serializedPayload,
      })
      .then((res) => {
        if (res.success) {
          const reqBody = {
            proof_payload: payload,
            proof: res.result,
          };
          return {
            request: {
              method: "POST",
              data: reqBody,
              url: "/v1/auth/login/singleton/hive",
            },
            userId: username,
          } satisfies AuthInfo;
        }
        throw new Error(res.error);
      });
  },
  logout() {
    return aioha.logout();
  },
} satisfies Authenticator;
