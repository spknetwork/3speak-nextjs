import { Box, Button, Flex, Link, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, OrderedList, Text, UnorderedList, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const StatsModal = ({ directDelegations,setDirectDelegations, list_rc_direct_delegations, seturlInfo, userDetails, isOpenModalStats, onCloseModalStats }: any) => {

    const [showComponent, setshowComponent] = useState<number>(1);
    
    
    useEffect(() => {
        const from = userDetails?.username; // Replace with the 'from' account
        const to = "";   // Replace with the 'to' account
        const limit = 50;        // Adjust the limit as needed

        list_rc_direct_delegations(from, to, limit)
            .then((result:any) => {
                setDirectDelegations(result);
            })
            .catch((error:any) => {
                console.error('Error fetching direct delegations:', error);
            });
    }, [list_rc_direct_delegations]);
    useEffect(() => {
        console.log("directDelegations", directDelegations?.rc_direct_delegations)
    }, [directDelegations])

    useEffect(()=> {
        if (userDetails?.username) {
            console.log("userDetails?.username",userDetails?.username)
            // seturlInfo(selectedUser)
            get_rc([`${userDetails?.username}`])  
        }
        
      },[userDetails])

      const addDelegation = () => {
        const data = {
            referral : userDetails?.username,
            username : "",
            delegated_rc: 5,
            create: true,
        }
        seturlInfo(data)
        // onOpenModalEditDelegate()
    }

    const editDelegation = (delegation:any) => {
        const data = {
            referral : delegation?.from,
            username : delegation?.to,
            delegated_rc: delegation.delegated_rc,
            create: false,
        }
        seturlInfo(data)
        // onOpenModalEditDelegate()
        console.log("delegation",delegation)
    }

    const deleteDelegation = (delegation:any) => {
        const data = {
            referral : delegation?.from,
            username : delegation?.to,
            delegated_rc: delegation.delegated_rc
        }
       let confirmNow= confirm("are you sure you want to delete?")
       if (confirmNow) {
        if (window.hive_keychain) {
            console.log("window.hive_keychain",window.hive_keychain)
            const json = JSON.stringify(['delegate_rc', {
                  from: `${delegation?.from}`,
                  delegatees: [`${delegation?.to}`],
                  max_rc: 0,
              }]);
            
            window.hive_keychain.requestCustomJson(
              `${delegation?.from}`,
              "rc",
              'Posting',
              json,
              "Delegate RC",
              callbackfunctestREs
            );


           

        } else {
            alert("Hive Keychain is not installed!");
        }
       }
    }

    const callbackfunctestREs = (res:any) => {
        // show modal call function here
        // setshowModalFormDelegateRC(true)
        // onOpenDRC()c
        // console.log("res",res)
        // onCloseDRC()

        const from = userDetails?.username; // Replace with the 'from' account
        const to = "";   // Replace with the 'to' account
        const limit = 100;        // Adjust the limit as needed

    list_rc_direct_delegations(from, to, limit)
        .then((result:any) => {
            setDirectDelegations(result);
        })
        .catch((error:any) => {
            console.error('Error fetching direct delegations:', error);
        });
      }
  const [getCurrentRc, setgetCurrentRc] = useState<any>(0);

      const get_rc = async (accounts:any) => {
        try {
          const response = await axios.post('https://api.hive.blog', {
            jsonrpc: '2.0',
            id: 1,
            method: 'rc_api.find_rc_accounts',
            params: {
              accounts
            }
          });
          response.data.result;
          console.log("response.data.result", response.data.result);
          if (response && response.data && response.data.result && response.data.result.rc_accounts.length > 0) {
            let currentRc = response.data.result.rc_accounts[0].max_rc / 1000000000;
            currentRc = Number(currentRc.toFixed(2));
            setgetCurrentRc(currentRc);
          }
        } catch (error) {
          console.error('Error fetching RC accounts:', error);
          throw error;
        }
      };
    return (
        <Modal size='xl'  closeOnOverlayClick={false} isOpen={isOpenModalStats} onClose={onCloseModalStats}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <UnorderedList
                        width={"100%"}
                        listStyleType={"none"}
                        paddingLeft="0"
                        display={"flex"}
                        justifyContent={{ base: "start", md: "start", lg: "start" }}
                        marginBottom={"0px"}
                        marginLeft={{ base: "0px", md: "0px" }}
                        flexDirection={{ base: "column", md: "column", lg: "row" }}
                    >
                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showComponent == 1 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showComponent == 1 ? "2px solid red" : ""}

                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => setshowComponent(1)}

                            >

                                Stats</Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showComponent == 2 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showComponent == 2 ? "2px solid red" : ""}
                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => setshowComponent(2)}

                            >

                                Delegated RC</Link>
                        </ListItem>
                    </UnorderedList>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {
                        showComponent == 1 && (
                            <Box>
                                {/* <Text as='h5'>Resource Credits: 100.00%</Text> */}
                                <Text as='h5'>Total RC: {getCurrentRc}B</Text>
                                {/* <SignInHive requestHiveLogin={requestHiveLogin} username={username} setUsername={setUsername} /> */}
                                <Button onClick={() => {addDelegation()}} colorScheme='twitter' size='sm'>
                                    Delegate RC
                                </Button>
                            </Box>
                        )
                    }

                    {
                        showComponent == 2 && (
                            <Box>
                                <OrderedList listStyleType={'none'} padding={'0'} margin={0}>
                                    {/* <Text>{directDelegations.rc_direct_delegations.length}</Text> */}
                                    <ListItem listStyleType={'none'}>
                                            <Flex justifyContent={'space-between'} alignItems={'center'}>
                                                <Box><b>Name</b></Box>
                                                <Box width={'100px'} ><b>Delegated RC</b></Box>
                                                <Box>
                                                    <b>Action</b>
                                                </Box>
                                            </Flex>
                                        </ListItem>
                                    {directDelegations && directDelegations.rc_direct_delegations && directDelegations.rc_direct_delegations.length > 0 && directDelegations?.rc_direct_delegations.map((delegation: any, index:number) => (
                                        <ListItem key={index}>
                                            <Flex justifyContent={'space-between'} alignItems={'center'}>
                                                <Box width={'80px'}>{delegation?.to}</Box>
                                                <Box width={'100px'} textAlign={'center'}> {Number(delegation?.delegated_rc)/1000000000}B</Box>
                                                <Box>
                                                    <Button onClick={() => editDelegation(delegation)} colorScheme='twitter' size='sm'>
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => deleteDelegation(delegation)} colorScheme='red' size='sm'>
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </Flex>
                                        </ListItem>
                                    ))}

                                    {/* <ListItem>Consectetur adipiscing elit</ListItem>
                                    <ListItem>Integer molestie lorem at massa</ListItem>
                                    <ListItem>Facilisis in pretium nisl aliquet</ListItem> */}
                                </OrderedList>
                                {/* <SignInHive requestHiveLogin={requestHiveLogin} username={username} setUsername={setUsername} /> */}
                            </Box>
                        )
                    }

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

export default StatsModal