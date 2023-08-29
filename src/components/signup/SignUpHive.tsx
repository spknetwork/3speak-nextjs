/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography,  Flex } from "src/components";
// import ReCAPTCHA from "react-google-recaptcha";
import SignUp from "@/components/signup/SignUp";
import Link from "next/link";
import SignIn from "@/components/sigin/SignIn";
import { Button,Box, Text } from "@chakra-ui/react";
import Image from "next/image";
const SignUpHive = ({ requestHiveLogin, username, setUsername }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignUpHive: any = useRef();

  const onSubmitWithReCAPTCHASignUpHive = async (e: any) => {
    e.preventDefault()
    // const token = await recaptchaRefSignUpHive.current.executeAsync();
    // console.log(token);
    requestHiveLogin()
    // apply to form data
  };
  return (
    <Box width="100%">
      <Box>
        <Text as='h2'>
          Login to 3Speak
        </Text>
        <Text>
          Select one of the supported login options that help keep your access safe and decentralized.
        </Text>
      </Box>
      <Box mx="auto" maxWidth="9rem">
        <img
          src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          alt="3speak logo"
          width="100%"
        />
      </Box>
      <form onSubmit={onSubmitWithReCAPTCHASignUpHive}>
        <Flex>
          <Flex width={'30rem'} borderRadius={'10px'} padding='5px' justifyContent={'center'} height={'50px'} backgroundColor={'black'} mt="1rem" mr='10px'>
            <img src="/keychain.6846c271.png" alt="3speak logo" />
          </Flex>
          <Box mt="1rem" width="100%">
            <fieldset className="Fieldset2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="Input2"
                id="text"
                placeholder="Enter username"
                type="text"
              />
            </fieldset>
          </Box>
          <Box mt="1rem" width="auto">
            <Button>{'>'}</Button>
          </Box>
        </Flex>
        <Flex>
          <Flex width={'30rem'} borderRadius={'10px'} padding='5px' justifyContent={'center'} height={'50px'} backgroundColor={'black'} mb="1rem" mt="1rem" mr='10px'>
            <img src="/hiveauth.ac85800f.svg" alt="3speak logo" />
          </Flex>
          <Box mt="1rem" width="100%">
            <fieldset className="Fieldset2">
              <input
                style={{cursor:'not-allowed'}}
                disabled={true}
                className="Input2"
                id="text"
                placeholder="Enter username"
                type="text"
              />
            </fieldset>
          </Box>
          <Box cursor={'not-allowed'} mt="1rem" width="auto">
            <Button  disabled={true}>{'>'}</Button>
          </Box>
        </Flex>
        <Flex>
          <Flex width={'30rem'} borderRadius={'10px'} padding='5px' justifyContent={'center'} height={'50px'} backgroundColor={'#d1d5da'} mb="1rem" mt="1rem" mr='10px'>
            <img src="/hivesigner.6958efa0.svg" alt="3speak logo" />
          </Flex>
          <Box mt="1rem" width="100%">
            <fieldset className="Fieldset2">
              <input 
                 style={{cursor:'not-allowed'}}
                disabled={true}
                className="Input2"
                id="text"
                placeholder="Enter username"
                type="text"
              />
            </fieldset>
          </Box>
          <Box mt="1rem" width="auto">
            <Button cursor={'not-allowed'} disabled={true}>{'>'}</Button>
          </Box>
        </Flex>


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
