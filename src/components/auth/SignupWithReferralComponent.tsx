import AuthLayout from "@/components/Layouts/auth_layout";
import HiveSignUpComponent from "@/components/hive_signup/HiveSignUpComponent";
import { Flex, useColorMode } from "@chakra-ui/react";
import * as Tabs from "@radix-ui/react-tabs";
import React, { useEffect } from "react";

const SignupWithReferralComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode == "dark") {
      toggleColorMode();
    }
  }, []);
  return (
    <Flex justifyContent="center">
      <Flex
        alignItems={{ _: "flex-start", tablet: "flex-start" }}
        backgroundColor="#F5F5F5"
        width={"35%"}
      >
          <HiveSignUpComponent />
      </Flex>
    </Flex>
  );
};

export default SignupWithReferralComponent;
