import { hexDec } from '@/utils/b64';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Client, RCAPI, utils,Operation } from "@hiveio/dhive";
import { Box, Button, Flex, Text } from '@chakra-ui/react';

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
  const { id } = router.query;
  // console.log('hash',id)
  const [urlInfo, seturlInfo] = useState<any>(null)
  const [community, setCommunity] = useState<any | null>(null);
  const [step, setStep] = useState("confirm");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(0)

  useEffect(() => {
    let decodedObj;
    try {
      if (id) {
        const decodedHash = hexDec(`${id}`);
        decodedObj = JSON.parse(decodedHash);
        console.log('decodedHash', decodedHash)
      }
    } catch (error) {
      console.log(error);
    }
    seturlInfo(decodedObj);
    getAccountTokens();
  }, []);

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
  const getAccountTokens = async () => {
    const acc = await getAccounts(['juneroy1']);
    console.log('acc', acc)
    setToken(acc[0]?.pending_claimed_accounts)
  }

  useEffect(() => {
    console.log('urlInfo', urlInfo)
  }, [urlInfo])

  const createAccount = async ()=> {
    try {
      const response: any = await createHiveAccount({
        username: urlInfo?.username,
        keys: urlInfo?.keys
      }, 
      "juneroy1"
      );
      console.log('response',response)
      // if (response.success === true) {
      //   setStep("success");
      //   await createBreakawayUser(urlInfo!.username, props.global.hive_id, urlInfo!.referral, urlInfo!.email)
      //   setMsg(response.message)
      // } else {
      //   setStep("fail")
      //   setMsg(response.message)
      // }
    } catch (error) {
      console.log(error)
    };
  };

  const createHiveAccount = async (data: any, creator_account: string) => {
    try {
      const { username, keys } = data;
  
      const account = {
      name: username,
      ...keys,
      active: false
      };
      console.log(account)
  
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
      account_auths: [["3speak.app", 1]],
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


  return (
    <Box padding={'30px'} width={'100%'} height='80vh'>
      <Flex flexDirection={'column'} width={'100%'} height='100%' justifyContent={'center'} alignItems='center'>
        <Text as='h2'>You are creating an account for a friend.</Text>
        <Flex padding={'20px'} paddingX='50px' width={'70%'} justifyContent='space-evenly'>
          <Button onClick={()=> createAccount()} colorScheme={'blue'}>Pay with (3Hive)</Button>
          <Button colorScheme={'blue'}>Pay with credits</Button>
        </Flex>
      </Flex>

    </Box>
  )
}

export default AccountRegisterForFriend