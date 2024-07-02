import {
  MagicLinkPopupActions,
  useMagicLinkPopup,
} from "magic-link-popup-react";
import { create } from "zustand";
import { hive } from "./hive";
import { Authenticator, AuthInfo } from "./types";
import { api, setAuthorization } from "./api";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID_KEY,
  LOCAL_STORAGE_DID_ENTROPY_KEY,
  LOCAL_STORAGE_DID_PUBLIC_KEY_KEY,
} from "./localStorageKeys";

type AuthState = {
  authenticated: boolean;
} & (
  | {
      authenticated: true;
      userId: string;
    }
  | {
      authenticated: false;
    }
);

const AuthStore = create<AuthState>(() => {
  if (typeof window === "undefined") {
    // TODO SSR support
    return {
      authenticated: false,
    };
  } else {
    const userId = window.localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY);
    if (userId) {
      return {
        authenticated: true,
        userId,
      };
    }
    return {
      authenticated: false,
    };
  }
});

export const useAuth = AuthStore;

const authenticators = {
  Hive: hive,
} satisfies Record<string, Authenticator>;

export type AuthMethod = keyof typeof authenticators;

type AuthOptions<Method extends AuthMethod> = Parameters<
  (typeof authenticators)[Method]["login"]
>;

const requestLogin = async ({ request, userId }: AuthInfo) => {
  request.data = JSON.stringify(request.data);
  const res = await api.request(request);
  const { access_token } = res.data;
  console.log("auth data", res.data);
  setAuthorization(access_token);
  window.localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, access_token);
  window.localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, userId);
  AuthStore.setState(
    {
      authenticated: true,
      userId,
    },
    true
  );
};

export const AuthActions = {
  login<Method extends AuthMethod>(
    method: Method,
    ...args: AuthOptions<Method>
  ) {
    return (
      authenticators[method]
        // @ts-ignore TS is dumb
        .login(...args)
        .then(requestLogin)
    );
  },
  logout() {
    // window.localStorage.removeItem(LOCAL_STORAGE_DID_ENTROPY_KEY);
    // window.localStorage.removeItem(LOCAL_STORAGE_DID_PUBLIC_KEY_KEY);
    // return MagicLinkPopupActions.logout();
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_STORAGE_USER_ID_KEY);
    for (const authenticator of Object.values(authenticators)) {
      authenticator.logout();
    }
  },
} as const;
