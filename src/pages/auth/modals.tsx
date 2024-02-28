import ForgotPassword from "@/components/auth/ForgotPassword";
import SigninWithHiveComponent from "@/components/auth/SigninWithHiveComponent";
import React, {useState} from "react";
import ParentComponent from "@/components/auth/ParentComponent";
import SignupWithReferralComponent from "@/components/auth/SignupWithReferralComponent";
import NormalSignin from "@/components/auth/NormalSignin";
import NormalSignup from "@/components/auth/NormalSignup";


type Props = {};


const Modals = (props: Props) => {
    
    const [currentAuthPage, setCurrentAuthPage] = useState<string>("");
  return (
    <>
      <div>modals</div>
      <ParentComponent currentAuthPage={currentAuthPage} setCurrentAuthPage={setCurrentAuthPage}/>
      {currentAuthPage === "tab1" && <NormalSignin />}
      {currentAuthPage === "tab2" && <SigninWithHiveComponent />}
      {currentAuthPage === "tab3" && <NormalSignup />}
      {currentAuthPage === "tab4" && <SignupWithReferralComponent />}

    </>
  );
};

export default Modals;
