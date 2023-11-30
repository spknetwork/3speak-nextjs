import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Form, Formik } from "formik";
import { useTranslation } from 'next-export-i18n';
import { Typography } from "src/components";
import styled from "styled-components";
import { KeyTypes, generatePassword, getPrivateKeys } from '@/helper/onboard';
import { hexEnc } from '@/utils/b64';
import clipboard from '@/utils/clipboard';
import { _t } from '@/i18n';
import Link from 'next/link';
import Image from 'next/image';

const HiveSignUpComponent = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Number>(0);
  const [newUserKeys, setNewUserKeys]: any = useState(null);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [referral, setReferral] = useState("");

  const [accountPassword, setAccountPassword] = useState("")
  const [urlHash, setUrlHash] = useState("")
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleSubmit = async (values: any) => {
    // setCurrentStep(1);
    try {
      const password: string = await generatePassword(32);
      const keys: KeyTypes = getPrivateKeys(values.username, password);
      console.log('password', password)
      console.log('keys', keys)
      setNewUserKeys((prev: any) => ({ ...prev, ...keys }));
      setAccountPassword(password)

      const username = values.file_name
      const email = values.email
      const referral = values.username
      setUsername(username)
      setEmail(email)
      setReferral(referral)

      const dataToEncode = {
        username,
        email,
        referral,
        keys: {
          activePubKey: keys.activePubkey,
          postingPubKey: keys.postingPubkey,
          ownerPubKey: keys.ownerPubkey,
          memoPubKey: keys.memoPubkey
        }
      }

      const stringifiedData = JSON.stringify(dataToEncode);
      const hash = hexEnc(stringifiedData)
      setUrlHash(hash)
      setCurrentStep(1);
    } catch (err) {
      console.log(err)
    }
  };

  const copyPasswordFunc = () => {
    clipboard(accountPassword)
  }

  const downloadKeys = async () => {
    if (newUserKeys) {
      setIsDownloaded(false);
      const element = document.createElement("a");
      const keysToFile = `
          ${_t("onboard.file-warning")}
  
          ${_t("onboard.recommend")}
          1. ${_t("onboard.recommend-print")}
          2. ${_t("onboard.recommend-use")}
          3. ${_t("onboard.recommend-save")}
          4. ${_t("onboard.recommend-third-party")}

          ${_t("onboard.account-info")}

          Username: ${username}

          Password: ${accountPassword}

          ${_t("onboard.owner-private")} ${newUserKeys.owner}
  
          ${_t("onboard.active-private")} ${newUserKeys.active}
  
          ${_t("onboard.posting-private")} ${newUserKeys.posting}
  
          ${_t("onboard.memo-private")} ${newUserKeys.memo}
  
  
          ${_t("onboard.keys-use")}
          ${_t("onboard.owner")} ${_t("onboard.owner-use")}   
          ${_t("onboard.active")} ${_t("onboard.active-use")}  
          ${_t("onboard.posting")} ${_t("onboard.posting-use")} 
          ${_t("onboard.memo")} ${_t("onboard.memo-use")}`;

      const file = new Blob([keysToFile.replace(/\n/g, "\r\n")], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = `${username}_hive_keys.txt`;
      document.body.appendChild(element);
      element.click();
      setIsDownloaded(true);
    }
  };

  const splitUrl = (url: string) => {
    return url.slice(0, 50);
  };
  return (
    <Box width="100%">
      <Box mx="auto" maxWidth="9rem">
        <Image  
          loader={() => "https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"}
          src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          alt="3speak logo"
          width="100"
          height={'100'}
        />
      </Box>
      {currentStep == 0 && (
        <Formik
          initialValues={{ username: "", email: "", file_name: "" }}
          validate={(props) => {
            const errors: any = {};

            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(props.email)) {
              errors.email = t("login.notValidEmail");
            }

            // if (!props.password) errors.password = t("required");
            if (!props.email) errors.email = t("required");
            if (!props.file_name) errors.file_name = t("required");
            if (!props.username) errors.username = t("required");

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="file_name">
                    Username
                  </label>
                  <input
                    className="Input3"
                    id="file_name"
                    placeholder={'Username'}
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name="file_name"
                  />
                  {!!props.errors.file_name && (
                    <Typography color="#FF3333">{props.errors.file_name}</Typography>
                  )}
                </fieldset>
              </Box>
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="email">
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
              <Box mb="1.5rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="username">
                    Refferal
                  </label>
                  <input
                    className="Input3"
                    id="username"
                    placeholder={'Refferal'}
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name="username"
                  />
                  {!!props.errors.username && (
                    <Typography color="#FF3333">{props.errors.username}</Typography>
                  )}
                </fieldset>
              </Box>
              <Flex width="100%" justifyContent="center" mt="1rem">
                <StyledButton type="submit">Sign Up</StyledButton>
              </Flex>
            </Form>
          )}


        </Formik>
      )}

      {currentStep == 1 && (
        <Box padding={'20px'}>
          <Text as='h1'>{_t("onboard.confirm-details")}</Text>
          <Box padding={'10px'}>
            <Text style={{ lineHeight: 2 }}>
              {_t("onboard.username")} <strong>{username}</strong>
            </Text>
            <Text style={{ lineHeight: 2 }}>
              {_t("onboard.email")} <strong>{email}</strong>
            </Text>
            <Text style={{ lineHeight: 2 }}>
              {_t("onboard.referral")} <strong>{referral}</strong>
            </Text>
            <Text style={{ lineHeight: 2 }}>
              <b>Note:</b> Please make sure you download and install a hive keychain in your browser, if not <span>visit this page on how to install hive keychain <a href='https://hive-keychain.com/'> visit page</a></span>
            </Text>
            <Text style={{ lineHeight: 2 }}>
              <b>Step 1:</b> Download file
            </Text>
            <Button marginBottom={'10px'} colorScheme='blue' onClick={() => downloadKeys()}>
             {_t("onboard.download-keys")}
            </Button>
            <Text style={{ lineHeight: 2 }}>
              <b>Step 2:</b> Send the link to an existing hive user to pay for your account
            </Text>
            <Box marginTop={'10px'} marginBottom={'20px'}>
            {/* <h4>{_t("onboard.copy-info-message")}</h4> */}
            {isDownloaded == true && (
              <div>
                {/* <Link href={`${window.origin}/onboard-friend/${urlHash}`}>{splitUrl(`${window.origin}/onboard-friend/${urlHash}`)}...</Link> */}
                <Link href={`${window.origin}/signup_onboarding/${urlHash}`}>{splitUrl(`${window.origin}/signup_onboarding/${urlHash}`)}</Link>
                <Button marginLeft={'5px'} colorScheme='blue' onClick={() => {
                  clipboard(`${window.origin}/signup_onboarding/${urlHash}`);
                  // success(_t("onboard.copy-link"))
                }}>copy</Button>
              </div>
            )}

            {isDownloaded == false && (
              <div>
                <Text>The link will be show here after you download the keys.</Text>
              </div>
            )}

          </Box>
            <Text as='span' fontStyle={'italic'} marginBottom={'10px'}>
              make sure they installed Hive Keychain and should be pinned to their desktop for a web app user and the app should be downloaded for a mobile user
            </Text>
            <br />
            <br />
            <Text style={{ lineHeight: 2 }}>
              <b>Step 3:</b> go to your email and check the account was created
            </Text>
            <Text style={{ lineHeight: 2 }}>
              <b>Step 4:</b> Copy the password and paste it in keychain

            </Text>
            <Text>{accountPassword}</Text>
          <Button colorScheme='green' onClick={(e) => copyPasswordFunc()}>Copy password</Button>
          </Box>

         

          

          
        </Box>
      )}

    </Box >
  )
}

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

export default HiveSignUpComponent