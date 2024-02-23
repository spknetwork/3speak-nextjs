import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
import { useToast } from "@chakra-ui/react";
import { useAppStore } from "@/lib/store";
import ReCAPTCHA from "react-google-recaptcha";
import { Box as ChakraBox } from "@chakra-ui/react";
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import GoogleAuth from "../SocialAuth/GoogleAuth";
import DiscordAuth from "../SocialAuth/DiscordAuth";
import GithubAuth from "../SocialAuth/GithubAuth";
import Image from "next/image";
const SignUp = () => {

  let magic: any
  if (typeof window !== "undefined") {
    magic = new Magic('pk_live_773A61B5424F8C7D', {
      extensions: [new OAuthExtension()],
    });
  }
  const googlelogin = async () => {
    // const data = await magic.oauth.loginWithRedirect({
    //   provider: 'google' /* 'google', 'facebook', 'apple', or 'github' */,
    //   redirectURI: 'http://localhost:3050/login',
    // });

    // console.log('data', data)
    try {
      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: new URL("/login", window.location.origin).href,
      });
    } catch (err) {
      console.error(err);
    }
  }


  const githublogin = async () => {
    const data = await magic.oauth.loginWithRedirect({
      provider: 'github' /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: new URL("/login", window.location.origin).href,
    });

    console.log('data', data)
  }

  const discordlogin = async () => {
    const data = await magic.oauth.loginWithRedirect({
      provider: 'discord' /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: new URL("/login", window.location.origin).href,
    });

    console.log('data', data)
  }
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignUp: any = useRef();


  const { register } = useAppStore();
  const handleSubmit = async (values: any) => {
    // const token = await recaptchaRefSignUp.current.executeAsync();
    // console.log(token);
    try {
      await register(values);
      toast({
        position: "top-right",
        title: "Successfully registered",
        description: "You can now try to sign in",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        position: "top-right",
        title: "Something went wrong",
        description: error?.response?.data?.reason,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.error("API call error:", error?.response?.data?.reason);
    }
  };
  return (
    <div>
      <Box width="100%">
        <Box mx="auto" maxWidth="9rem">
          <Image
            loader={() => 'https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png'}
            src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
            alt="3speak logo"
            width={'100'} height='100'
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
                    <Typography color="#FF3333">
                      {props.errors.email}
                    </Typography>
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
              <ChakraBox display={'flex'} justifyContent='center' alignItems={'center'} marginTop={"10px"}>
                {/* <ReCAPTCHA
                  ref={recaptchaRefSignUp}
                  sitekey="6LczvdokAAAAAGQtbk2MABrUD8oyYbmi9Z3O8Uio"
                /> */}
              </ChakraBox>

              <Flex width="100%" justifyContent="center" mt="1rem">
                <StyledButton type="submit">Sign Up</StyledButton>
              </Flex>
            </Form>

          )}
        </Formik>
        <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <GoogleAuth googlelogin={googlelogin} label='Sign Up with Google'/>
        </Flex>
        <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <GithubAuth githublogin={githublogin} label='Sign Up with Github'/>
        </Flex>
        <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <DiscordAuth discordlogin={discordlogin} label='Sign Up with Discord'/>
        </Flex>
      </Box>
    </div>
  );
};

const StyledList = styled.ul`
  padding-left: 0.5rem;
`;

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

export default SignUp;
