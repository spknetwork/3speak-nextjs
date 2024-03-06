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
         width={"35%"}
         boxShadow={"10px 10px 5px lightblue"}
         px="2rem"
         alignItems={{ _: "flex-start", tablet: "flex-start" }}
         paddingBottom="20px"
         paddingTop="20px"
      >
          <HiveSignUpComponent />
      </Flex>
    </Flex>
  );
};

export default SignupWithReferralComponent;
