// pages/login.js or any other component

// import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import { useAppStore } from "@/lib/store";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

// import GoogleLoginButton from 'components/GoogleLoginButton';

const LoginPage = () => {
  const { checkAuth , allowAccess} = useAppStore();

    const [user, setUser] = useState();
    let magic: any
    if (typeof window !== "undefined") {
        magic = new Magic('pk_live_773A61B5424F8C7D', {
            extensions: [new OAuthExtension()],
        });
        

        useEffect(() => {

            finishSocialLogin();
        }, []);
    }
    const finishSocialLogin = async () => {
        try {

            const result = await magic.oauth.getRedirectResult();
            setUser(result);
            // console.log("result", result)
            // console.log("result", result.oauth.accessToken)
            // localStorage.setItem("access_token", result.oauth.accessToken);
            createPersonalSign()

        } catch (err) {
            console.error(err);
        }
    };

    const createPersonalSign= async () => {
        const magic = new Magic("pk_live_773A61B5424F8C7D", {
            network: "bhive",
          });
        const web3 = new Web3(magic.rpcProvider);
        const signedMessage = await web3.eth.personal.sign(
            "Login to your account",
            "juneroy1",
            ""
          );
          console.log("signedMessage:", signedMessage);
          // recover the public address of the signer to verify
          const recoveredAddress = recoverPersonalSignature({
            data: "Login to your account",
            signature: signedMessage,
          });
          console.log(
            recoveredAddress.toLocaleLowerCase() === "juneroy1"
              ? "Signing success!"
              : "Signing failed!"
          );
    }

    const logout = async () => {
        try {
            await magic.user.logout();
        } catch (err) {
            console.error(err);
        }
    };

    const checkauth = async () => {
        try {
           await checkAuth()
           console.log("allowAccess",allowAccess)
        } catch (error) {
            console.error(error); 
        }
    }


    // Result has the following interface

    // interface OAuthRedirectResult {

    //   magic: {

    //     idToken: string;

    //     userMetadata: MagicUserMetadata;

    //   },

    //   oauth: {

    //     provider: string;

    //     scope: string[];

    //     accessToken: string;

    //     userHandle: string;

    //     userInfo: ...;

    //   }

    // };
    return (
        <div className="container">
            {!user && <div className="loading">Loading...</div>}

            {user && (
                <div>
                    <h1>Data returned:</h1>
                    <pre className="user-info">{JSON.stringify(user, null, 3)}</pre>
                    <button className="logout-button" onClick={checkauth}>
                        Check Auth now
                    </button>
                </div>
            )}
            <button className="logout-button" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default LoginPage;
