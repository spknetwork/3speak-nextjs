import { useState } from "react";
import React from "react";
import { MagicLinkPopupActions, useMagicLinkPopup } from "magic-link-popup-react";


export function useAuth() {
  if (typeof window !== "undefined") {
    return {
      authenticated: !!window.localStorage.getItem("auth-entropy"),
    };
  }
}

export function removeAuth() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("auth-entropy");
    window.localStorage.removeItem("auth-public-key");
    return {
        authenticated: !!window.localStorage.getItem("auth-entropy"),
    };
  }
}
