/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { Typography, Box, Flex } from "src/components";
import axios from "axios";
import { API_URL } from '../../utils/config';
// import ReCAPTCHA from "react-google-recaptcha";
const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const recaptchaRefSignUp: any = useRef();

  const onSubmitWithReCAPTCHASignUp = async () => {
    const token = await recaptchaRefSignUp.current.executeAsync();
    console.log(token);
    // apply to form data
  };

  const handleSubmit = async (values: any) => {
    console.log("test", values);
    try {
   
      const requestBody = JSON.stringify({
        ...values,
        username: values.email
     })
      // Make a POST request using Axios with headers and body
      const response = await axios.post(
        API_URL+"/v1/auth/register",
        requestBody,
        {
          headers: {
            // Set your custom headers here
            "Content-Type": "application/json",
          },
        }
      );
      // const response = await fetch("https://acela.us-west.web3telekom.xyz/api/v1/auth/register", {
      //   method: "POST",

      //   body: JSON.stringify(values),
      // });

      console.log('response',response);
      // Handle the response here
    } catch (error) {
      console.error("API call error:", error);
    }
  };
  return (
    <div>
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
            // if (!props.username) errors.username = t("username");
            if (!props.email) errors.email = t("required");

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Box mb="2rem" mt="1.5rem" width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="currentPassword">
                    Email
                  </label>
                  <input
                    className="Input"
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
              {/* <Box width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="username">
                    Hive username
                  </label>
                  <input
                    className="Input"
                    id="username"
                    placeholder="hive username"
                    type="text"
                  /> */}
              {/* {!!props.errors.username && (
                    <Typography color="#FF3333">
                      {props.errors.username}
                    </Typography>
                  )} */}
              {/* </fieldset>
              </Box> */}
              <Box width="100%">
                <fieldset className="Fieldset">
                  <label className="Label" htmlFor="newPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    className="Input"
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
                    Some email services will wrongly sort our our emails,
                    remember to check your junk/spam folder!
                  </Typography>
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
                    In order to claim the keys for the Hive account associated
                    with your 3speak account you must post at least one video.
                  </Typography>
                </Box>
              </Box>
              {/* <ReCAPTCHA
                  ref={recaptchaRefSignUp}
                  sitekey="6LczvdokAAAAAGQtbk2MABrUD8oyYbmi9Z3O8Uio"
                /> */}
              <Flex width="100%" justifyContent="center" mt="1rem">
                <StyledButton type="submit">Sign Up</StyledButton>
              </Flex>
            </Form>
          )}
        </Formik>
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
