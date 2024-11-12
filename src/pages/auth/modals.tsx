import ForgotPassword from "@/components/auth/ForgotPassword";
import SigninWithHiveComponent from "@/components/auth/SigninWithHiveComponent";
import React, { useState } from "react";
import ParentComponent from "@/components/auth/ParentComponent";
import SignupWithReferralComponent from "@/components/auth/SignupWithReferralComponent";
import NormalSignin from "@/components/auth/NormalSignin";
import NormalSignup from "@/components/auth/NormalSignup";
import { Box, Flex } from "@chakra-ui/react";
import { Router } from "next/router";
import ErrorComponent from "@/components/ErrorComponent";

type Props = {};

//making an enum value to the auth page
enum AuthPage {
  Tab1 = "tab1",
  Tab2 = "tab2",
  Tab3 = "tab3",
  Tab4 = "tab4",
}

const Modals = (props: Props) => {
  const [currentAuthPage, setCurrentAuthPage] = useState<string>("tab1");
  if (typeof window === "undefined") {
    return null;
  }

  const token = window.localStorage.getItem("access_token");
  if (token) {
    return (
      <>
        <ErrorComponent errorMsg="You are already logged in" />
      </>
    );
  }
  return (
    <>
      <Box id="parent_auth_modal" h={"100vh"} w={"full"} padding={0} margin={0}>
        <ParentComponent
          currentAuthPage={currentAuthPage}
          setCurrentAuthPage={setCurrentAuthPage}
        />
        {currentAuthPage === AuthPage.Tab1 && <NormalSignin />}
        {currentAuthPage === AuthPage.Tab2 && <SigninWithHiveComponent />}
        {currentAuthPage === AuthPage.Tab3 && <NormalSignup />}
        {currentAuthPage === AuthPage.Tab4 && <SignupWithReferralComponent />}
      </Box>
    </>
  );
};

export default Modals;
