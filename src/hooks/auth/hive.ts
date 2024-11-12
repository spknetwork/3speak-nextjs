import { Aioha, initAioha, KeyTypes, Providers } from "@aioha/aioha";
import { Authenticator, AuthInfo } from "./types";

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


// import hive from 'hive.ts'


// hive.logout()