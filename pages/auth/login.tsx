/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Formik } from "formik";
import { Typography, Box, Flex } from "components";
import { useTranslation } from "next-export-i18n";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useUser } from "state/selectors/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const { t } = useTranslation();

  return (
    <Flex
      justifyContent="center"
      px="1rem"
      alignItems={{ _: "flex-start", tablet: "center" }}
      backgroundColor="#F5F5F5"
      minHeight="100vh"
      minWidth="100vw"
    >
      <Box width="100%" maxWidth="18.75rem">
        <Box mx="auto" maxWidth="9rem">
          <img
            src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
            alt="3speak logo"
            width="100%"
          />
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
          <Typography fontColor="1.75rem" textAlign="center" color="#721c24">
            {t("login.disclaimer")}
          </Typography>
        </Box>
        <Typography textAlign="center" fontSize="2rem" mt="1rem">
          {t("login.title")}
        </Typography>
        <Formik
          initialValues={{ password: "", email: "" }}
          validate={({ password, email }) => {
            const errors: any = {};

            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
              errors.email = t("login.notValidEmail");
            }

            if (!password) errors.password = t("required");
            if (!email) errors.email = t("required");

            return errors;
          }}
          onSubmit={(values) => {
            console.log(values, "submit");
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="0.125rem" mt="1.5rem" width="100%">
                <StyledInput
                  type="string"
                  placeholder={t("login.email")}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email}
                />
                {!!errors.email && (
                  <Typography color="#FF3333" mt="0.25rem">
                    {errors.email}
                  </Typography>
                )}
              </Box>
              <Box width="100%">
                <StyledInput
                  type="string"
                  placeholder={t("login.password")}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                />
                {!!errors.password && (
                  <Typography mt="0.25rem" color="#FF3333">
                    {errors.password}
                  </Typography>
                )}
              </Box>
              <Flex width="100%" justifyContent="center" mt="1rem">
                <StyledButton type="submit">Log in</StyledButton>
              </Flex>
              <Flex width="100%" justifyContent="center" mt="0.5rem">
                <StyledButton type="submit">
                  Sign up with existing HIVE account
                </StyledButton>
              </Flex>
              <Flex width="100%" justifyContent="center" mt="0.5rem">
                <StyledButton
                  colors={{ init: "grey", active: "#D3D3D3", hover: "#d1d1d1" }}
                  type="submit"
                >
                  PasswordReset
                </StyledButton>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

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
  padding: 10px 21px;
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
  min-width: 100%;
  padding: 1rem 0.5rem;
  margin: 0.5rem 0 0rem;
  border-radius: 0.45rem;
  outline: none;
  border: none;
  border: 1px solid ${({ error }) => (error ? "#FF3333" : "#2f2d2d")};
`;

export default LoginPage;
