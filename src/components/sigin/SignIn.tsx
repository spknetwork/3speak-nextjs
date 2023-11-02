/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
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
import { API_URL_FROM_WEST } from "../../utils/config";
import axios from "axios";
import { api } from "@/utils/api";
import { useAppStore } from "@/lib/store";
import { Button, Text } from "@chakra-ui/react";
// import { Magic } from "magic-sdk";
import { FcGoogle } from "react-icons/fc";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import GoogleAuth from "../SocialAuth/GoogleAuth";
import GithubAuth from "../SocialAuth/GithubAuth";
import DiscordAuth from "../SocialAuth/DiscordAuth";
// const magic = new Magic("pk_live_7645A843999E2369");


const SignIn = () => {
  let magic: any
  if (typeof window !== "undefined") {
    magic = new Magic('pk_live_773A61B5424F8C7D', {
      extensions: [new OAuthExtension()],
    });
    // console.log('herererererere')
  }
  const googlelogin = async () => {
    const data = await magic.oauth.loginWithRedirect({
      provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: 'http://localhost:3050',
    });

    console.log('data', data)
  }


  const githublogin = async () => {
    const data = await magic.oauth.loginWithRedirect({
      provider: 'github' /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: 'http://localhost:3050',
    });

    console.log('data', data)
  }

  const discordlogin = async () => {
    const data = await magic.oauth.loginWithRedirect({
      provider: 'discord' /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: 'http://localhost:3050',
    });

    console.log('data', data)
  }

  const [onboarding, setOnboarding] = useState<any>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignIn: any = useRef();
  const redirectToForgotPasswordPage = () => {
    window.location.href = "/auth/forgot_password"
  }

  const { allowAccess, login, checkAuth } = useAppStore();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
    } else {
      setAuthenticated(false);
    }
  }, [allowAccess]);

  useEffect(() => {
    if (authenticated) {
      if (onboarding) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }

    }
  }, [authenticated, router]);

  const handleSubmit = async (values: any) => {
    setOnboarding(true)
    await login(values);
    checkAuth();
  };

  const showThirdPartyLogin = () => {
    // call the magic link function here
    console.log("call the magic link function here");
  };

  return (
    <Box width="100%">
      <Box mx="auto" maxWidth="9rem">
        <img
          src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          alt="3speak logo"
          width="100%"
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
            <Box
              width="100%"
              borderRadius="0.25rem"
              mt="1.5rem"
              py="0.75rem"
              px="1.25rem"
              backgroundColor="#f8d7da"
              border="1px solid #f5c6cb"
            >
              <Typography textAlign="center" color="#721c24">
                {t("login.disclaimer")}
              </Typography>
            </Box>
            <Flex width="100%" justifyContent="center" mt="1rem">
              <StyledButton type="submit">Log in</StyledButton>
            </Flex>
            <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
              <GoogleAuth googlelogin={googlelogin} label='Sign in with Google'/>
            </Flex>
            <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
              <GithubAuth githublogin={githublogin} label='Sign in with Github'/>
            </Flex>
            <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
              <DiscordAuth discordlogin={discordlogin} label='Sign in with Discord' />
            </Flex>

            <Flex width="100%" justifyContent="center" mt="0.5rem">
              {/* <Link href="/auth/forgot_password"> */}
              <Box onClick={() => redirectToForgotPasswordPage()} width={'100%'}>
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
