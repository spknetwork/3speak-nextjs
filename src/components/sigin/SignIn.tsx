/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
// import ReCAPTCHA from "react-google-recaptcha";
import SignUp from "@/components/signup/SignUp";
import Link from "next/link";

import { useAppStore } from "@/lib/store";
import { Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";

import GoogleAuth from "../SocialAuth/GoogleAuth";
import GithubAuth from "../SocialAuth/GithubAuth";
import DiscordAuth from "../SocialAuth/DiscordAuth";
import Image from "next/image";
import {
  useMagicLinkPopup,
  MagicLinkPopupActions,
  State,
} from "magic-link-popup-react";

import { getMagic } from "magic-link-popup";
import * as uint8arrays from 'uint8arrays'
import {DID} from 'dids'
import * as KeyDidResolver from 'key-did-resolver'
import {Ed25519Provider} from 'key-did-provider-ed25519'

const SignIn = () => {
  //making an instance for the useMagicApiKey()

  console.log("this is the return hook", useMagicLinkPopup);
  const googlelogin = () => {
    try {
      MagicLinkPopupActions.login({
        type: "oauth",
        provider: "google",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const githublogin = async () => {
    try {
      MagicLinkPopupActions.login({
        type: "oauth",
        provider: "github",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const discordLogin = async () => {
    try {
      MagicLinkPopupActions.login({
        type: "oauth",
        provider: "discord",
      });
    } catch (err) {
      console.error(err);
    }
  };
  const [onboarding, setOnboarding] = useState<any>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignIn: any = useRef();
  const redirectToForgotPasswordPage = () => {
    window.location.href = "/auth/forgot_password";
  };

  const { allowAccess, login, checkAuth } = useAppStore();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
    } else {
      setAuthenticated(false);
    }
  }, [allowAccess]);

  //function for login redirection
  const magic: State = useMagicLinkPopup();

  const generateDID = async () => {
    const m = getMagic();
    const provider = new ethers.BrowserProvider(m.rpcProvider);

    const signer = await provider.getSigner();
    const encoder = new TextEncoder();
    const msg = encoder.encode('Allow this account to control your identity')
    const sig = await signer.signMessage(msg);

    window.localStorage.setItem('auth-entropy', sig) 


    const sigBytes = uint8arrays.fromString(sig.slice(2), 'hex')
    const entropyBytes = new Uint8Array(sigBytes.slice(0,32));

    const did = new DID({provider: new Ed25519Provider(entropyBytes), resolver: KeyDidResolver.getResolver()})
    await did.authenticate();

    const didId = did.id
    window.localStorage.setItem('auth-public-key', didId)
  };

  useEffect(() => {
    if (magic.initialized) {
      if (magic.loggedIn === true) {
        generateDID().then(() =>
        router.push("/"));
        
        // setAuthenticated(true);
      }
    }
    console.log(magic);
  }, [magic, router]);

  useEffect(() => {
    if (authenticated) {
      if (onboarding) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }
    }
  }, [authenticated, router, onboarding]);

  const handleSubmit = async (values: any) => {
    setOnboarding(true);
    await login(values);
    checkAuth();
  };

  const showThirdPartyLogin = () => {
    // call the magic link function here
    console.log("call the magic link function here");
  };
  const loadImage = () => {
    return "https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png";
  };

  return (
    <Box width="100%">
      <Box mx="auto" maxWidth="9rem">
        <Image
          alt="logo player"
          loader={loadImage}
          src={`https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png`}
          width={"100"}
          height={"100"}
        />
      </Box>

      <Formik
        initialValues={{ password: "", email: "" }}
        validate={(props) => {
          const errors: any = {};

          if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(props.email)) {
            errors.email = t("login.notValidEmail");
          }

          if (!props.password) errors.password = t("required");
          if (!props.email) errors.email = t("required");

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          // <form onSubmit={onSubmitWithReCAPTCHASignIn}>
          <Form>
            <Box mb="1.5rem" mt="1.5rem" width="100%">
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="currentPassword">
                  Email
                </label>
                <input
                  className="Input3"
                  id="email"
                  placeholder={t("login.email")}
                  type="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="email"
                />
                {!!props.errors.email && (
                  <Typography color="#FF3333">{props.errors.email}</Typography>
                )}
              </fieldset>
            </Box>
            <Box width="100%">
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="newPassword">
                  Password
                </label>
                <input
                  type="password"
                  className="Input3"
                  placeholder={t("login.password")}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="password"
                  id="password"
                />
                {!!props.errors.password && (
                  <Typography mt="0.25rem" color="#FF3333">
                    {props.errors.password}
                  </Typography>
                )}
              </fieldset>
            </Box>
            <Flex width="100%" justifyContent="center" mt="1rem">
              <StyledButton type="submit">Log in</StyledButton>
            </Flex>
            <Flex
              width="100%"
              border={"1px solid"}
              borderRadius="6px"
              justifyContent="center"
              mt="1rem"
            >
              <GoogleAuth
                googlelogin={googlelogin}
                label="Sign in with Google"
              />
            </Flex>
            <Flex
              width="100%"
              border={"1px solid"}
              borderRadius="6px"
              justifyContent="center"
              mt="1rem"
            >
              <GithubAuth
                githublogin={githublogin}
                label="Sign in with Github"
              />
            </Flex>
            <Flex
              width="100%"
              border={"1px solid"}
              borderRadius="6px"
              justifyContent="center"
              mt="1rem"
            >
              <DiscordAuth
                discordLogin={discordLogin}
                label="Sign in with Discord"
              />
            </Flex>

            <Flex width="100%" justifyContent="center" mt="0.5rem">
              {/* <Link href="/auth/forgot_password"> */}
              <Box
                onClick={() => redirectToForgotPasswordPage()}
                width={"100%"}
              >
                <StyledButton
                  className="text-dark"
                  colors={{
                    init: "#fff",
                    active: "#D3D3D3",
                    hover: "#d1d1d1",
                  }}
                  type="button"
                >
                  Forgot password
                </StyledButton>
              </Box>
            </Flex>
            {/* </form> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};
const StyledButton = styled.button<{
  colors?: { init: string; hover: string; active: string };
}>`
  align-items: center;
  appearance: button;
  width: 100%;
  justify-content: center;
  background-color: ${({ colors }) => colors?.init ?? "#0276ff"};
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  padding: 15px 21px;
  text-align: center;
  text-transform: none;
  transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
    opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    background-color: ${({ colors }) => colors?.active ?? "#006ae8"};
  }

  &:hover {
    background-color: ${({ colors }) => colors?.hover ?? "#1c84ff"};
  }
`;
export default SignIn;
function useEffectLayout(arg0: () => void) {
  throw new Error("Function not implemented.");
}
