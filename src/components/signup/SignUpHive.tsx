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

const SignUpHive = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignUpHive: any = useRef();

  const onSubmitWithReCAPTCHASignUpHive = async () => {
    const token = await recaptchaRefSignUpHive.current.executeAsync();
    console.log(token);
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
              Email Address
            </label>
            <input
              className="Input"
              id="emailAddress"
              placeholder="Enter email"
              type="email"
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username / Channel name
            </label>
            <input
              className="Input"
              id="username"
              placeholder="Enter channel"
              type="text"
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="password">
              Password
            </label>
            <input
              className="Input"
              id="password"
              placeholder="Enter password"
              type="password"
            />
            <Box
              width="100%"
              borderRadius="0.25rem"
              mt="1.5rem"
              py="0.75rem"
              px="1.25rem"
              backgroundColor="#bee5eb"
              border="1px solid #bee5eb"
            >
              <Typography color="#0c5460">
                {/* fontSize="0.75rem" */}
                <StyledList>
                  {(t("register.passwordRules") as string[]).map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </StyledList>
              </Typography>
            </Box>
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
