import React, { useEffect, useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
// import ReCAPTCHA from "react-google-recaptcha";
import SignIn from "@/components/sigin/SignIn";
import AuthLayout from "@/components/Layouts/auth_layout";
import { useColorMode } from "@chakra-ui/react";
const TabsDemo = ({ tab }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRef: any = useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode == 'dark') {
      toggleColorMode()
    }
  },[colorMode, toggleColorMode])
  const onSubmitWithReCAPTCHA = async () => {
   
    const token = await recaptchaRef.current.executeAsync();
    console.log(token);
  };
  return (
    <AuthLayout>
      <Flex
        justifyContent="center"
        alignItems={{ _: "flex-start", tablet: "flex-start" }}
        backgroundColor="#F5F5F5"

      >

        <Tabs.Content className="TabsContent" value={'tab1'}>
          <SignIn />
        </Tabs.Content>
      </Flex>
    </AuthLayout>

  );
};

const GetAccountText = styled(Typography)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #001fff;
  }
`;

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

const StyledInput = styled.input<{ error: boolean }>`
  width: 95%;
  padding: 1rem 1rem;
  margin: 10px 0px;
  border-radius: 0.45rem;
  outline: none;
  border: none;
  border: 1px solid ${({ error }) => (error ? "#FF3333" : "#2f2d2d")};
`;

export default TabsDemo;
