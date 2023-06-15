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
const ForgotPassword = () => {
  const router = useRouter();
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
      alignItems={{ _: "flex-start", tablet: "flex-start" }}
      backgroundColor="#F5F5F5"
      minHeight="100vh"
      minWidth="100vw"
      paddingTop="100px"
    >
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Forgot Password
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <Box width="100%">
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
              onSubmit={(values) => {
                console.log(values, "submit");
              }}
            >
              {(props) => (
                <form onSubmit={onSubmitWithReCAPTCHA}>
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
                  <Flex width="100%" justifyContent="center" mt="1rem">
                    <StyledButton type="submit">Send Email</StyledButton>
                  </Flex>
                </form>
              )}
            </Formik>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
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

export default ForgotPassword;
