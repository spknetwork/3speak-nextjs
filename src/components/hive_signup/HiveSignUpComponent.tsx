import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Form, Formik } from "formik";
import { useTranslation } from 'next-export-i18n';
import { Typography } from "src/components";
import styled from "styled-components";

const HiveSignUpComponent = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Number>(0);
  const handleSubmit = async (values: any) => {
    setCurrentStep(1);
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
                    File name
                  </label>
                  <input
                    className="Input3"
                    id="file_name"
                    placeholder={'File name'}
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
                    Username
                  </label>
                  <input
                    className="Input3"
                    id="username"
                    placeholder={t("login.username")}
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