import { Avatar, Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { MdClose } from 'react-icons/md'

const AccountsList = ({ listAccounts, addAccounts, isOpenModal1, onCloseModal1 }: any) => {

    const changeAccount = (account:any) => {
        localStorage.setItem("access_token", account.token);
        localStorage.setItem(`keychainToken_${account.username}`, account.token);
        window.location.reload()
    }
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpenModal1} onClose={onCloseModal1}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Accounts</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Box>
                        {listAccounts && listAccounts.length > 0 && listAccounts.map((account: any, index:number) => {
                            return (
                                <Flex onClick={()=> changeAccount(account) } cursor={'pointer'} key={index} justifyContent={'space-between'} alignItems='center'>
                                    <Flex justifyContent={'space-between'} alignItems='center'>
                                        <Box margin={'5px'} marginX={'5px'}><Avatar size={"sm"} src={`${account.avatar}`} /></Box>
                                        <Box margin={'5px'} marginX={'5px'}>{account.username}</Box>
                                        <Box margin={'5px'} marginX={'5px'}>({account.type})</Box>
                                    </Flex>
                                    <Box cursor={'pointer'}>
                                        <MdClose />
                                    </Box>
                                </Flex>)
                          
                        })}

                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={addAccounts} colorScheme='blue' mr={3}>
                        Add Account
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AccountsList