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


const HiveSignIn = ({ tab }: any) => {
  

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
  }, [authenticated, router]);

  const [username, setUsername] = useState<string>("")
  // const [dateNow, setDateNow] = useState<string>("")
  const dateNow = new Date().toISOString()

  const callback = async (response: any) => {
    const result = response
    const proof_payload = {
      account: username,
      ts: dateNow,
    }
    const data = {
      username: username,
      network: 'hive',
      authority_type: 'posting',
      proof_payload: JSON.stringify(proof_payload),
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
    console.log('_response', _response)
    localStorage.setItem("access_token", _response.data.access_token);
    checkAuth();

    // call saving in localstorage
    saveLocalStorage()
  };

  const saveLocalStorage = () => {
    let dataToStore = {
      avatar: 'https://source.unsplash.com/random/200x200?sig=3',
      username: username,
      type: 'Keychain',
      token: ''
    }

    let accounts
    const local = localStorage.getItem("accountsList")
    if (!local) {
      localStorage.setItem("accountsList", JSON.stringify([dataToStore]))
    } else {
      accounts = JSON.parse(local)
      const checkData = accounts.filter((item: any) => item.username == username)
      console.log('checkData', checkData)
      if (accounts.length < 6 && checkData.length == 0) {
        accounts.push(dataToStore)
        localStorage.setItem("accountsList", JSON.stringify(accounts))
      }
    }
  }

  
  const requestHiveLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOnboarding(true)
    const request:HiveLoginInterface = {
      username: username,
      dateNow: dateNow,
      callback: callback
    }
    login_with_hive(request)
    
  };

  return (
    <Flex
      justifyContent="center"
      px="1rem"
      py="1rem"
      alignItems={{ _: "flex-start", tablet: "flex-start" }}
      backgroundColor="#F5F5F5"
    >
      <Tabs.Content className="TabsContent w-100" value={'tab2'}>
        <SignInHive requestHiveLogin={requestHiveLogin} username={username} setUsername={setUsername} />
      </Tabs.Content>
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

export default HiveSignIn;
