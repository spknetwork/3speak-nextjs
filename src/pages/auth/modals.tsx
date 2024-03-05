import ForgotPassword from "@/components/auth/ForgotPassword";
import SigninWithHiveComponent from "@/components/auth/SigninWithHiveComponent";
import React, {useState} from "react";
import ParentComponent from "@/components/auth/ParentComponent";
import SignupWithReferralComponent from "@/components/auth/SignupWithReferralComponent";
import NormalSignin from "@/components/auth/NormalSignin";
import NormalSignup from "@/components/auth/NormalSignup";


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
  return (
    <>
      <ParentComponent currentAuthPage={currentAuthPage} setCurrentAuthPage={setCurrentAuthPage}/>
      {currentAuthPage === AuthPage.Tab1 && <NormalSignin />}
      {currentAuthPage === AuthPage.Tab2 && <SigninWithHiveComponent />}
      {currentAuthPage === AuthPage.Tab3 && <NormalSignup />}
      {currentAuthPage === AuthPage.Tab4 && <SignupWithReferralComponent />}

    </>
  );
};

export default Modals;
