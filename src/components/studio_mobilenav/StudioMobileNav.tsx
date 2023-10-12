import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useAppStore } from '../../lib/store'

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { isOpen: isOpenModal1, onOpen:onOpenModal1, onClose: onCloseModal1 } = useDisclosure()

  const router = useRouter();
  const switchAccounts = () => {
    console.log('switch account')
    // show modal list of accounts available
    isOpenModal1

  }

  const addAccounts = () => {
    console.log('addAccounts')
    // show modal list of accounts available
    onCloseModal1()


  }
  const { userDetails } = useAppStore();
  const logout = () => {
    localStorage.removeItem("access_token"); //
    // in order to reset the localstorage it needs to refresh the whole page
    location.reload(); 
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text margin={0} fontSize="sm">{userDetails?.username}</Text>
                  <Text margin={0}  fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuItem onClick={onOpenModal1}>Switch Account</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>

      <Modal size='md' closeOnOverlayClick={false} isOpen={isOpenModal1} onClose={onCloseModal1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accounts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box>
              <Flex justifyContent={'space-between'} alignItems='center'>
                <Flex justifyContent={'space-between'} alignItems='center'>
                  <Box marginX={'5px'}>Avatar</Box>
                  <Box marginX={'5px'}>Juneroy1</Box>
                  <Box marginX={'5px'}>(Keychain)</Box>
                </Flex>
                <Box>
                  <Text> X</Text>
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'} alignItems='center'>
                <Flex justifyContent={'space-between'} alignItems='center'>
                  <Box marginX={'5px'}>Avatar</Box>
                  <Box marginX={'5px'}>Juneroy2</Box>
                  <Box marginX={'5px'}>(Keychain)</Box>
                </Flex>
                <Box>
                  <Text> X</Text>
                </Box>
              </Flex>
            </Box>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit nemo quos iusto!</p> */}
          </ModalBody>

          <ModalFooter>
            <Button onClick={addAccounts} colorScheme='blue' mr={3}>
              Add Account
            </Button>
            {/* <Button onClick={onCloseModal1}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MobileNav;
