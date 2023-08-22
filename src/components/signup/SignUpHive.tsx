/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
// import ReCAPTCHA from "react-google-recaptcha";
import SignUp from "@/components/signup/SignUp";
import Link from "next/link";
import SignIn from "@/components/sigin/SignIn";

const SignUpHive = ({ requestHiveLogin, username, setUsername }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignUpHive: any = useRef();

  const onSubmitWithReCAPTCHASignUpHive = async (e:any) => {
    e.preventDefault()
    // const token = await recaptchaRefSignUpHive.current.executeAsync();
    // console.log(token);
    requestHiveLogin()
    // apply to form data
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
      <form onSubmit={onSubmitWithReCAPTCHASignUpHive}>
        <Box mb="2rem" mt="1.5rem" width="100%">
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="emailAddress">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="Input"
              id="text"
              placeholder="Enter username"
              type="text"
            />
          </fieldset>

          {/* <ReCAPTCHA
            ref={recaptchaRefSignUpHive}
            sitekey="6LczvdokAAAAAGQtbk2MABrUD8oyYbmi9Z3O8Uio"
          /> */}
          <Flex width="100%" justifyContent="center" mt="1rem">
            <StyledButton type="submit">Sign Up</StyledButton>
          </Flex>
        </Box>
      </form>
    </Box>
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

export default SignUpHive;
