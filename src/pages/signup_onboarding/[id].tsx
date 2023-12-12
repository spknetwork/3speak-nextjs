import { hexDec } from '@/utils/b64';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { Client, RCAPI, utils,Operation,OperationName } from "@hiveio/dhive";
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
// import Link from 'next/link';
import { useToast } from "@chakra-ui/react";
import { useAppStore } from '@/lib/store';
// import {PrivateKey, Operation, OperationName, TransactionConfirmation, AccountUpdateOperation, CustomJsonOperation} from '@hiveio/dhive';


interface ActiveUser {
  username: string;
  // data: Account;
  // points: UserPoints;
}
interface Props {
  activeUser: ActiveUser
  global: Global
  // communities: Community[]
}

interface AccountInfo {
  username: string;
  referral: string;
  email: string;
  keys: {
    postingPubKey: string;
    ownerPubKey: string;
    activePubKey: string;
    memoPubKey: string;
  }
}
function AccountRegisterForFriend(props: any) {
  const router = useRouter();
  const { pathname } = useRouter();

  const is_signup_onboarding = pathname.includes("/signup_onboarding");

  const { allowAccess, userDetails, listAccounts, setAccounts } = useAppStore();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess);
      return
    } 
    if (allowAccess == false) {
      setAuthenticated(false);
      return
    }
  }, [allowAccess]);

  useEffect(() => {
    if (authenticated == false && authenticated != null && !is_signup_onboarding) {
      router.push("/auth/login");
    }
  }, [authenticated, router]);

  const toast = useToast();

  const [step, setStep] = useState<any>(1)
  // const router = useRouter();
  const { id } = router.query;
  console.log('hash',id)
  const [urlInfo, seturlInfo] = useState<any>(null)
  const [community, setCommunity] = useState<any | null>(null);
  // const [step, setStep] = useState("confirm");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(0)
 
  useEffect(() => {
    let decodedObj;
    // try {
      if (id ) {
        const decodedHash = hexDec(`${id}`);
        decodedObj = JSON.parse(decodedHash);
        console.log('decodedHash', decodedObj.referral)
        // console.log('userDetails?.username', userDetails?.username)
        seturlInfo(decodedObj);
        
      }
    // } catch (error) {
    //   console.log(error);
    // }
  
  }, [id]);
  useEffect(() => {
   
    if (urlInfo) {
      console.log("urlInfo", urlInfo)
      const referral = urlInfo.referral
      getAccountTokens(referral)
    }
    // getAccountTokens();
  },[urlInfo])
  const getAccountTokens = async (referral:any) => {
    const getUsername = referral.toLowerCase()
    // if (getUsername) {
      // console.log("getUsername",getUsername)
      if (getAccounts) {
        const acc = await getAccounts([`${getUsername}`]);
        console.log('acc', acc)
        setToken(acc[0]?.pending_claimed_accounts)
      } 
    // }
    
  }
  useEffect(() => {
    console.log('toklen here', token)
  }, [token])
  const SERVERS = [
    "https://rpc.ecency.com",
    "https://api.hive.blog",
    "https://api.deathwing.me",
    "https://rpc.ausbit.dev",
    "https://hived.emre.sh"
  ]

  const client = new Client(SERVERS, {
    timeout: 4000,
    failoverThreshold: 2,
    consoleOnFailover: true,
  });
  const getAccounts = async (usernames: string[]): Promise<any[]> => {
    return await client.database.getAccounts(usernames).then((resp: any[]): any[] =>
      resp.map((x) => {
        const account: any = {
          name: x.name,
          owner: x.owner,
          active: x.active,
          posting: x.posting,
          memo_key: x.memo_key,
          post_count: x.post_count,
          created: x.created,
          reputation: x.reputation,
          posting_json_metadata: x.posting_json_metadata,
          last_vote_time: x.last_vote_time,
          last_post: x.last_post,
          json_metadata: x.json_metadata,
          reward_hive_balance: x.reward_hive_balance,
          reward_hbd_balance: x.reward_hbd_balance,
          reward_vesting_hive: x.reward_vesting_hive,
          reward_vesting_balance: x.reward_vesting_balance,
          balance: x.balance,
          hbd_balance: x.hbd_balance,
          savings_balance: x.savings_balance,
          savings_hbd_balance: x.savings_hbd_balance,
          next_vesting_withdrawal: x.next_vesting_withdrawal,
          vesting_shares: x.vesting_shares,
          delegated_vesting_shares: x.delegated_vesting_shares,
          received_vesting_shares: x.received_vesting_shares,
          vesting_withdraw_rate: x.vesting_withdraw_rate,
          to_withdraw: x.to_withdraw,
          withdrawn: x.withdrawn,
          witness_votes: x.witness_votes,
          proxy: x.proxy,
          proxied_vsf_votes: x.proxied_vsf_votes,
          voting_manabar: x.voting_manabar,
          voting_power: x.voting_power,
          downvote_manabar: x.downvote_manabar,
          pending_claimed_accounts: x.pending_claimed_accounts,
          __loaded: true,
        };
        let profile: any | undefined;

        try {
          profile = JSON.parse(x.posting_json_metadata!).profile;
        } catch (e) {
        }

        if (!profile) {
          try {
            profile = JSON.parse(x.json_metadata!).profile;
          } catch (e) {
          }
        }

        if (!profile) {
          profile = {
            about: '',
            cover_image: '',
            location: '',
            name: '',
            profile_image: '',
            website: '',
          }
        }

        return { ...account, profile };
      }
      ))
  }
  

  useEffect(() => {
    console.log('urlInfo', urlInfo)
  }, [urlInfo])
  const accountWithCredit = async () => {
    const getUsername = urlInfo.referral.toLowerCase()
    if (getUsername) {
      try {
        const response: any = await createAccountWithCredit({
          username: urlInfo?.username,
          keys: urlInfo?.keys
        }, 
        `${getUsername}`
        )
        console.log('response',response)
  
        if (response.success === true) {
          // setStep("success");
          // await createBreakawayUser(urlInfo!.username, props.global.hive_id, urlInfo!.referral, urlInfo!.email)
          // setMsg(response.message)
          setStep(2)
  
          toast({
            position: "top-right",
            title: "Successfully registered",
            description: "You can try to visit the profile in the link below",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          // setStep("fail")
          // setMsg(response.message)
          setStep(3)
  
          toast({
            position: "top-right",
            title: "Something went wrong",
            description: "Please try again",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        
      }
    }
    
  }
  const createAccount = async ()=> {
    const getUsername = urlInfo.referral.toLowerCase()
    if (getUsername) {
      try {
        const response: any = await createHiveAccount({
          username: urlInfo?.username,
          keys: urlInfo?.keys
        }, 
        `${getUsername}`
        );
        console.log('response',response)
        if (response.success === true) {
          // setStep("success");
          // await createBreakawayUser(urlInfo!.username, props.global.hive_id, urlInfo!.referral, urlInfo!.email)
          // setMsg(response.message)
          setStep(2)
  
          toast({
            position: "top-right",
            title: "Successfully registered",
            description: "You can try to visit the profile in the link below",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          // setStep("fail")
          // setMsg(response.message)
          setStep(3)
          toast({
            position: "top-right",
            title: "Something went wrong",
            description: "Please try again",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error)
      };
    }
    
  };
  const createAccountWithCredit = async (data: any, creator_account: string) => {
    try {
      const { username, keys } = data;
  
      const account = {
        name: username,
        ...keys,
        active: false
      };
  
      let tokens: any = await getAccounts([creator_account]);
      console.log(tokens)
      tokens = tokens[0]?.pending_claimed_accounts;
  
      let fee = null;
      let op_name: OperationName = "create_claimed_account";
  
      const owner = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [[account.ownerPubKey, 1]]
      };
      const active = {
        weight_threshold: 1,
        account_auths: [],
        key_auths: [[account.activePubKey, 1]]
      };
      const posting = {
        weight_threshold: 1,
        account_auths: [["threespeak", 1]],
        key_auths: [[account.postingPubKey, 1]]
      };
      const ops: Array<any> = [];
      const params: any = {
        creator: creator_account,
        new_account_name: account.name,
        owner,
        active,
        posting,
        memo_key: account.memoPubKey,
        json_metadata: "",
        extensions: []
      };
  
      if (fee) params.fee = fee;
      const operation: Operation = [op_name, params];
      ops.push(operation);
      try {
        const newAccount = await broadcast(creator_account, [operation], "Active");
        return newAccount;
      } catch (err: any) {
        return err;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  const createHiveAccount = async (data: any, creator_account: string) => {
    try {
      const { username, keys } = data;
  
      const account = {
      name: username,
      ...keys,
      active: false
      };
      console.log("account",account)
  
      const op_name: OperationName = "account_create";
  
      const owner = {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[account.ownerPubKey, 1]]
      };
      const active = {
      weight_threshold: 1,
      account_auths: [],
      key_auths: [[account.activePubKey, 1]]
      };
      const posting = {
      weight_threshold: 1,
      account_auths: [["threespeak", 1]],
      key_auths: [[account.postingPubKey, 1]]
      };
      const ops: Array<any> = [];
      const params: any = {
      creator: creator_account,
      new_account_name: account.name,
      owner,
      active,
      posting,
      memo_key: account.memoPubKey,
      json_metadata: "",
      extensions: [],
      fee: "3.000 HIVE"
      };
      const operation: Operation = [op_name, params];
      ops.push(operation);
      try {

      const response = await broadcast(creator_account, [operation], "Active");
      console.log(response)
          return response;
          } catch (err: any) {
          console.log(err);
          return err;
          }
  } catch (err) {
      console.log(err);
  }
  }

   const broadcast = (account: string, operations: any[], key: any, rpc: string | null = null): Promise<any> =>
    new Promise<any>((resolve, reject) => {
        window.hive_keychain?.requestBroadcast(account, operations, key, (resp:any) => {
            if (!resp.success) {
                reject(resp);
                // reject({message: "Operation cancelled"});
            }

            resolve(resp);
        }, rpc);
    })
  
  // if (authenticated === null) {
  //   return <Box>Loading...</Box>;
  // }
  
  // if (authenticated === false) {
  //   return <Box>Unauthorized access, please login first</Box>;
  // }

  return (
    <Box padding={'30px'} width={'100%'} height='80vh'>
      {step == 1 && (
      <Flex flexDirection={'column'} width={'100%'} height='100%' justifyContent={'center'} alignItems='center'>
        <Text as='h2'>You are creating an account for a friend.</Text>
        <Flex padding={'20px'} paddingX='50px' width={'70%'} justifyContent='space-evenly'>
          <Button onClick={()=> createAccount()} colorScheme={'blue'}>Pay with (3Hive)</Button>
          <Button onClick={() => accountWithCredit()} colorScheme={'blue'}>Pay with credits</Button>
        </Flex>
      </Flex>
      )}

      {step == 2 && (
      <Flex flexDirection={'column'} width={'100%'} height='100%' justifyContent={'center'} alignItems='center'>
        <Text as='h2'>Successfully registered account!</Text>
        <Link href={`/${urlInfo?.username}`}>Visist {urlInfo?.username}&quot;s profile</Link>
        
      </Flex>
      )}

      {step == 3 && (
      <Flex flexDirection={'column'} width={'100%'} height='100%' justifyContent={'center'} alignItems='center'>
        <Text>Something Went Wrong!</Text>
        <Button onClick={() => setStep(1)}>Try Again</Button>
        
      </Flex>
      )}
      

    </Box>
  )
}

export default AccountRegisterForFriend