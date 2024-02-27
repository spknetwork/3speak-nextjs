// pages/login.js or any other component

// import GoogleLoginButton from "@/components/login/GoogleLoginButton";
import { useAppStore } from "@/lib/store";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';

// import { magic as magin2, provider } from '../utils/magic'
import Web3 from "web3";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

// import GoogleLoginButton from 'components/GoogleLoginButton';

const LoginPage = () => {
  const { checkAuth , allowAccess} = useAppStore();

    const [user, setUser] = useState();
    let magic: any
    let provider: any
    if (typeof window !== "undefined") {
        // magic = new Magic('pk_live_773A61B5424F8C7D', {
        //     extensions: [new OAuthExtension()],
        // });

        // Initialize Magic with your Magic publishable key
   magic = new Magic('pk_live_773A61B5424F8C7D', {
    extensions: [new OAuthExtension()],
    network: 'mainnet',
  });
  
  // Create a Web3 provider using Magic's Ethereum provider
   provider = new ethers.providers.Web3Provider(magic.rpcProvider);
        

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

    const createPersonalSign= async (message= "Login to your account") => {
        try {
            // Ensure the user is logged in with Magic
            // await magic.auth.loginWithMagicLink({ email: "eroyjune@gmail.com" });
    
            // Get the signer from the provider
            const signer = provider.getSigner();
    
            // Sign the message
            const signature = await signer.signMessage(message);
    
            // return signature;
            console.log("signature",signature)
        } catch (error) {
            console.error('Error signing message:', error);
            throw error; // Propagate error for further handling
        }



        // try {
        //     const email = 'eroyjune@gmail.com'; // The email address of the user
        //     const response = await fetch('/api/signMessage', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify({ email, message }),
        //     });
        
        //     const data = await response.json();
        //     if (data.signature) {
        //       console.log('Signature:', data.signature);
        //       // Handle the signed message (e.g., display it, send it to a server)
        //     } else {
        //       console.error('Failed to sign the message.');
        //     }
        //   } catch (error) {
        //     console.error('Error signing message:', error);
        //   }


        //   1
        // const magic = new Magic("pk_live_773A61B5424F8C7D", {
        //     network: `mainnet`,
        //   });
        // const web3 = new Web3(magic.rpcProvider);
        // const signedMessage = await web3.eth.personal.sign(
        //     "Login to your account",
        //     "juneroy1",
        //     ""
        //   );
        //   console.log("signedMessage:", signedMessage);
        //   // recover the public address of the signer to verify
        //   const recoveredAddress = recoverPersonalSignature({
        //     data: "Login to your account",
        //     signature: signedMessage,
        //   });
        //   console.log(
        //     recoveredAddress.toLocaleLowerCase() === "juneroy1"
        //       ? "Signing success!"
        //       : "Signing failed!"
        //   );
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
                        {/* {user?.oauth?.userInfo?.email} */}
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
