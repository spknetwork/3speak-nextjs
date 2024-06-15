import { useState } from "react";
import React from "react";
import { MagicLinkPopupActions, useMagicLinkPopup } from "magic-link-popup-react";


export function useAuth() {
  if (typeof window !== "undefined") {
    return {
    //   authenticated: !!window.localStorage.getItem("auth-entropy"),
      authenticated: !!window.localStorage.getItem("access_token")
    };
  } else {
    return {
      authenticated: false,
    }
  }
}

export function removeAuth() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("auth-entropy");
    window.localStorage.removeItem("auth-public-key");
    window.localStorage.removeItem("access_token");
    return {
        authenticated: !!window.localStorage.getItem("auth-entropy")  
        // authenticated: !!window.localStorage.getItem("access_token"),
    };
  }
}
