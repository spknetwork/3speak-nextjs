import {
  Avatar,
  AvatarBadge,
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
  Switch,
  useColorMode,
  ColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { useAppStore } from "../../lib/store";
import AccountsList from "../Modal/AccountsList";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Image from "next/image";

interface MobileProps extends FlexProps {
  onOpen: () => void;
  requestHiveLogin?: () => void | null;
  setUsername?: () => void | null;
  username?: () => string | number | readonly string[] | undefined | null;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const { listAccounts, setAccounts } = useAppStore();

  const router = useRouter();
  const switchAccounts = () => {
    console.log("switch account");
    // show modal list of accounts available
    isOpenModal1;
  };
  useEffect(() => {
    console.log("im here in nav", listAccounts);
  }, [listAccounts]);

  const addAccounts = () => {
    console.log("addAccounts");
    // show modal list of accounts available
    onCloseModal1();
    onOpenModal2();
  };
  const { userDetails } = useAppStore();
  const logout = () => {
    localStorage.removeItem("access_token"); //
    // in order to reset the localstorage it needs to refresh the whole page
    location.reload();
  };

  //for the dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();

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
                  <Text margin={0} fontSize="sm">
                    {userDetails?.username}
                  </Text>
                  <Text margin={0} fontSize="xs" color="gray.600">
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
          <Flex px={2} mt={2}>
            <Text
              fontSize={["xs", "sm", "md", "xl"]}
            >
              <Switch
                // size={["sm", "sm", "md", "4xl"]}
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />{" "}
              {colorMode === "dark" && <MoonIcon />}{" "}
              {colorMode !== "dark" && <SunIcon />}
            </Text>
          </Flex>
        </Flex>
      </HStack>

      <AccountsList
        isOpenModal1={isOpenModal1}
        onCloseModal1={onCloseModal1}
        listAccounts={listAccounts}
        addAccounts={addAccounts}
      />
      <Modal
        size="md"
        closeOnOverlayClick={false}
        isOpen={isOpenModal2}
        onClose={onCloseModal2}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box width="100%">
              <Box>
                <Text as="h2" textAlign={"center"}>
                  Login to 3Speak
                </Text>
                <Text textAlign={"center"}>
                  Select one of the supported login options that help keep your
                  access safe and decentralized.
                </Text>
              </Box>
              <Box mx="auto" maxWidth="9rem">
                <Image
                  loader={() =>
                    `https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png`
                  }
                  src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
                  alt="3speak logo"
                  width="100%"
                />
              </Box>
              <form>
                <Flex>
                  <Flex
                    width={"30rem"}
                    borderRadius={"10px"}
                    padding="10px"
                    justifyContent={"center"}
                    height={"50px"}
                    backgroundColor={"black"}
                    mt="11px"
                    mr="10px"
                  >
                    <Image src="/keychain.6846c271.png" alt="3speak logo" />
                  </Flex>
                  <Box
                    marginRight={{ base: "10px", md: "10px", lg: "5px" }}
                    mt="1rem"
                    width="100%"
                  >
                    <fieldset className="Fieldset2">
                      {/* value={username} */}
                      {/* onChange={(e) => setUsername(e.target.value)} */}
                      <input
                        className="Input2"
                        id="text"
                        placeholder="Enter username"
                        type="text"
                      />
                    </fieldset>
                  </Box>
                  <Box mt="1rem" width="auto">
                    {/* onClick={(e) => requestHiveLogin(e)} */}
                    <Button type="submit" height={"92%"}>
                      <FaLongArrowAltRight />
                    </Button>
                  </Box>
                </Flex>
              </form>
              <Flex>
                <Flex
                  width={"30rem"}
                  borderRadius={"10px"}
                  padding="10px"
                  justifyContent={"center"}
                  height={"50px"}
                  backgroundColor={"black"}
                  mt="11px"
                  mr="10px"
                >
                  <Image src="/hiveauth.ac85800f.svg" alt="3speak logo" />
                </Flex>
                <Box
                  marginRight={{ base: "10px", md: "10px", lg: "5px" }}
                  mt="1rem"
                  width="100%"
                >
                  <fieldset className="Fieldset2">
                    <input
                      style={{ cursor: "not-allowed" }}
                      disabled={true}
                      className="Input2"
                      id="text"
                      placeholder="Enter username"
                      type="text"
                    />
                  </fieldset>
                </Box>
                <Box cursor={"not-allowed"} mt="1rem" width="auto">
                  <Button height={"92%"} disabled={true}>
                    <FaLongArrowAltRight />
                  </Button>
                </Box>
              </Flex>
              <Flex>
                <Flex
                  width={"30rem"}
                  borderRadius={"10px"}
                  padding="10px"
                  justifyContent={"center"}
                  height={"50px"}
                  backgroundColor={"#d1d5da"}
                  mt="11px"
                  mr="10px"
                >
                  <Image src="/hivesigner.6958efa0.svg" alt="3speak logo" />
                </Flex>
                <Box
                  marginRight={{ base: "10px", md: "10px", lg: "5px" }}
                  mt="1rem"
                  width="100%"
                >
                  <fieldset className="Fieldset2">
                    <input
                      style={{ cursor: "not-allowed" }}
                      disabled={true}
                      className="Input2"
                      id="text"
                      placeholder="Enter username"
                      type="text"
                    />
                  </fieldset>
                </Box>
                <Box mt="1rem" width="auto">
                  <Button height={"92%"} cursor={"not-allowed"} disabled={true}>
                    <FaLongArrowAltRight />
                  </Button>
                </Box>
              </Flex>

              {/* </form> */}
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button onClick={addAccounts} colorScheme='blue' mr={3}>
              Add Account
            </Button> */}
            {/* <Button onClick={onCloseModal1}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default MobileNav;
