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
import { Button } from "@chakra-ui/react";
import { Magic } from "magic-sdk";

// const magic = new Magic("pk_live_7645A843999E2369");
const SignIn = () => {
  const [onboarding, setOnboarding] = useState<any>(false);
  // const [idToken, setIdToken] = useState();

  const connectWallet = async () => {
    // const accounts = await magic.wallet
    //   .connectWithUI()
    //   .on("id-token-created", (params:any) => {
    //     setIdToken(params.idToken);
    //   });

    // setAccount(accounts[0]);
  };

  // const showUI = () => {
  //   magic.wallet.showUI();
  // };

  // const logout = async () => {
  //   await magic.user.logout();
  //   setAccount(null);
  // };

  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignIn: any = useRef();

  const onSubmitWithReCAPTCHASignIn = async () => {
    // const token = await recaptchaRefSignIn.current.executeAsync();
    // console.log(token);
    // apply to form data
  };

  const { allowAccess, login, checkAuth } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
      // return
    } else {
      setAuthenticated(false);
    }
  }, [allowAccess]);

  useEffect(() => {
    if (authenticated) {
      if (onboarding) {
        router.push("/onboarding");
      }else{
        router.push("/");
      }
     
    }
  }, [authenticated, router]);

  const handleSubmit = async (values: any) => {
    // const token = await recaptchaRefSignIn.current.executeAsync();
    // console.log(token);
    setOnboarding(true)
    await login(values);
    // router.push("/otp/enter_code");
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
                {/* fontSize="1.75rem" */}
                {t("login.disclaimer")}
              </Typography>
            </Box>
            {/* <Box
              marginTop={'10px'}
            >
              <ReCAPTCHA
                ref={recaptchaRefSignIn}
                sitekey="6LczvdokAAAAAGQtbk2MABrUD8oyYbmi9Z3O8Uio"
              />
            </Box> */}

            <Flex width="100%" justifyContent="center" mt="1rem">
              <StyledButton type="submit">Log in</StyledButton>
            </Flex>
            {/* <Flex width="100%" border={'1px solid'} borderRadius='6px'  justifyContent="center" mt="1rem">
              <Button
                onClick={() => connectWallet()}
                width={"100%"}
                variant={"outline"}
                colorScheme="gray"
              >
                Login with Social Accounts
              </Button>
            </Flex> */}
            <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <Button
            width={"100%"}
            variant={"outline"}
            colorScheme="gray"
          >
            Sign up with Google
          </Button>
        </Flex>
        <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <Button
            width={"100%"}
            variant={"outline"}
            colorScheme="gray"
          >
            Sign up with Github
          </Button>
        </Flex>
        <Flex width="100%" border={'1px solid'} borderRadius='6px' justifyContent="center" mt="1rem">
          <Button
            width={"100%"}
            variant={"outline"}
            colorScheme="gray"
          >
            Sign up with Discord
          </Button>
        </Flex>

            <Flex width="100%" justifyContent="center" mt="0.5rem">
              <Link href="/auth/forgot_password">
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
              </Link>
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
