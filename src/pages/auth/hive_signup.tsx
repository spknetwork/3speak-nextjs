/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
import { KeychainSDK } from "keychain-sdk";
// import ReCAPTCHA from "react-google-recaptcha";
import SignUp from "@/components/signup/SignUp";
import Link from "next/link";
import SignIn from "@/components/sigin/SignIn";
import SignUpHive from "@/components/signup/SignUpHive";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { API_URL_FROM_WEST } from "@/utils/config";
import { useAppStore } from "@/lib/store";


const TabsDemo = ({ tab }: any) => {
  const [datawindow] = useState<any>(window)

  const router = useRouter();
  const { allowAccess, checkAuth } = useAppStore();
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
      }else{
        router.push("/");
      }
    }
  }, [authenticated, router]);


  const [username, setUsername] = useState<string>("")
  const [dateNow, setDateNow] = useState<string>("")
  const datan = new Date().toISOString()
  const callback =  async (response: any) =>  {
    console.log("response", response);
    const result =response
    console.log("result", result);

    const proof_payload = {
      account: username,
      ts: datan,
    }
    const data = {
      username: username,
      network: 'hive',
      authority_type: 'posting',
      proof_payload:JSON.stringify(proof_payload),
      proof: result.result,
    }

    const _response = await axios.post(
      API_URL_FROM_WEST + "/v1/auth/login_singleton",
      data,
      {
        headers: {
          // Set your custom headers here
          "Content-Type": "application/json",
        },
      }
    );
    console.log('_response',_response)
    localStorage.setItem("access_token", _response.data.access_token);
    checkAuth();
  };
  const requestHiveLogin = async () => {
    const dateN = new Date().toISOString()
    setDateNow(dateN)
    setOnboarding(true)
    try {
      // Gives @stoodkev active authority with weight 2 to `account`
      const keychain = datawindow.hive_keychain;
      console.log("keychain", keychain);
      const proof_payload = {
        account: username,
        ts: datan,
      }
      keychain.requestSignBuffer(
        username,
        JSON.stringify(proof_payload),
        "Posting",
        callback,
        null,
        "Login using Hive",
        (response: any) => {
          console.log("response",response);
        }
      );
    } catch (error) {
      console.log({ error });
    }
  };
  console.log("tabhere", tab);
 
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRef: any = useRef();

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();
    console.log(token);
    // apply to form data
  };
  return (
    <Flex
      justifyContent="center"
      px="1rem"
      py="1rem"
      alignItems={{ _: "flex-start", tablet: "flex-start" }}
      backgroundColor="#F5F5F5"
    >
      <Tabs.Content className="TabsContent" value={tab}>
        {/* <Button onClick={() => requestHiveLogin("juneroy1")}>hive</Button> */}
        <SignUpHive requestHiveLogin={requestHiveLogin} username={username} setUsername={setUsername}  />
      </Tabs.Content>
      {/* <Tabs.Content className="TabsContent" value="tab2">
          <SignUpHive />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab3">
          <SignUp />
        </Tabs.Content> */}
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

export default TabsDemo;
