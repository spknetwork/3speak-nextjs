import { useAppStore } from '@/lib/store';
import { API_URL_FROM_WEST } from '@/utils/config';
import { Avatar, Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { HiveLoginInterface } from 'types';
import SignInHive from '../signup/SignInHive';

const SignInModal = ({ addAccountsNow, isOpenModal2, onCloseModal2 }: any) => {
    const { allowAccess, checkAuth, login_with_hive } = useAppStore();

    const [onboarding, setOnboarding] = useState<any>(false);
    const [username, setUsername] = useState<string>("")
    // const [dateNow, setDateNow] = useState<string>("")
    const dateNow = new Date().toISOString()

    const requestHiveLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOnboarding(true)
        const request: HiveLoginInterface = {
            username: username,
            dateNow: dateNow,
            callback: callback
        }
        login_with_hive(request)

    };

    const callback = async (response: any) => {
        const result = response
        const proof_payload = {
          account: username,
          ts: dateNow,
        }
        const data = {
          username: username,
          network: 'hive',
          authority_type: 'posting',
          proof_payload: JSON.stringify(proof_payload),
          proof: result.result,
        }
    
        const _response = await axios.post(
          API_URL_FROM_WEST + "/v1/auth/login_singleton",
          data,
          {
            headers: {
              // Set your custom headers here
              "Content-Type": "application/json",
            },
          }
        );
        console.log('_response', _response)
        localStorage.setItem("access_token", _response.data.access_token);
        localStorage.setItem(`keychainToken_${username}`, _response.data.access_token);
        // save users
        // save keychainToken_username
        checkAuth();
    
        // call saving in localstorage
        saveLocalStorage(_response.data.access_token)
      };
    
      const saveLocalStorage = (token:any) => {
        let dataToStore = {
          avatar: 'https source.unsplash.com/random/200x200?sig=3',
          username: username,
          type: 'Keychain',
          token: `${token}`
        }
    
        let accounts
        const local = localStorage.getItem("accountsList")
        if (!local) {
          localStorage.setItem("accountsList", JSON.stringify([dataToStore]))
        } else {
          accounts = JSON.parse(local)
          const checkData = accounts.filter((item: any) => item.username != username)
          console.log('checkData', checkData)
          // if (accounts.length < 6 && checkData.length == 0) {
            // if (checkData.length == 0) {
            accounts = checkData
            accounts.push(dataToStore)
            localStorage.setItem("accountsList", JSON.stringify(accounts))
          // }
        }
        window.location.reload()
      }
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpenModal2} onClose={onCloseModal2}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign In</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Box>
                        <SignInHive requestHiveLogin={requestHiveLogin} username={username} setUsername={setUsername} />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    {/* <Button onClick={addAccountsNow} colorScheme='blue' mr={3}>
                        Add Now
                    </Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SignInModal