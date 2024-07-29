import React, { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
import SignInHive from "@/components/signup/SignInHive";
import axios from "axios";
import { API_URL_FROM_WEST } from "@/utils/config";
import { useAppStore } from "@/lib/store";
import { HiveLoginInterface } from "types";
import AuthLayout from "@/components/Layouts/auth_layout";
import { useColorMode } from "@chakra-ui/react";

const SigninWithHiveComponent = ({ tab }: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode == "dark") {
      toggleColorMode();
    }
  }, []);

  const router = useRouter();
  const { allowAccess, checkAuth, login_with_hive } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [onboarding, setOnboarding] = useState<any>(false);

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
      } else {
        router.push("/");
      }
    }
  }, [authenticated, router, onboarding]);

  const [username, setUsername] = useState<string>("");
  // const [dateNow, setDateNow] = useState<string>("")
  const dateNow = new Date().toISOString();

  const requestHiveLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Flex justifyContent="center">
      <Flex
        width={["100%", "100%", "35%", "35%"]}
        boxShadow={"5px 5px 3px lightblue"}
        px="2rem"
        alignItems={{ _: "flex-start", tablet: "flex-start" }}
        paddingBottom="20px"
        paddingTop="20px"
      >
        <SignInHive
          requestHiveLogin={requestHiveLogin}
          username={username}
          setUsername={setUsername}
        />
      </Flex>
    </Flex>
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

export default SigninWithHiveComponent;
