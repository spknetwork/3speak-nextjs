import React, { ReactNode } from "react";
import styled from "styled-components";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  CardHeader,
  Stack,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUpload,
  FiVideo,
  FiUsers,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import {
  FaArchive,
  FaChartLine,
  FaCloudUploadAlt,
  FaCog,
  FaExternalLinkAlt,
  FaRegEye,
  FaSignOutAlt,
  FaUpload,
  FaUserAlt,
  FaUsers,
  FaVideo,
  FaWallet,
} from "react-icons/fa";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome },
  { name: "Upload", icon: FaCloudUploadAlt },
  { name: "Videos", icon: FaVideo },

  { name: "My Channel", icon: FaExternalLinkAlt },
  { name: "Logout", icon: FaSignOutAlt },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Box paddingLeft={"1.5rem"} paddingRight="1.5rem">
          <Box>
            <Card background={"#ededed"}>
              <CardBody borderRadius="10px" background={"white"}>
                <Box height={"60vh"} width={"100%"}>
                  <Flex
                    height={"100%"}
                    width={"100%"}
                    flexDirection="column"
                    justifyContent={"center"}
                  >
                    <Flex
                      height={"100%"}
                      flexDirection={{
                        base: "column-reverse",
                        md: "column-reverse",
                        lg: "row",
                      }}
                    >
                      <Box
                        width={{ base: "100%", md: "100%", lg: "40%" }}
                        padding="20px"
                        paddingY={{ base: "5px", md: "5px", lg: "40px" }}
                      >
                        <Flex
                          width={"100%"}
                          height="100%"
                          justifyContent="center"
                          alignItems={"center"}
                          border={"1px solid black"}
                          padding="20px"
                          paddingY={"40px"}
                          borderRadius={"5px"}
                        >
                          <Flex
                            borderRadius={"5px"}
                            width={"100%"}
                            height="100%"
                            justifyContent="center"
                            alignItems={"center"}
                            border={"1px dotted grey"}
                            fontSize={{ base: "60px", md: "60px", lg: "100px" }}
                          >
                            <FaUpload color="grey" />
                          </Flex>
                        </Flex>
                      </Box>
                      <Box
                        width={{ base: "100%", md: "100%", lg: "60%" }}
                        padding="20px"
                        paddingY={{ base: "5px", md: "5px", lg: "40px" }}
                      >
                        <Flex
                          width={"100%"}
                          height="100%"
                          justifyContent="center"
                          alignItems={"start"}
                          flexDirection="column"
                        >
                          <Text
                            as={"h1"}
                            fontSize={{
                              base: "25px !important",
                              sm: "25px !important",
                              lg: "39px",
                            }}
                          >
                            Drag and drop video files to upload
                          </Text>
                          <Text
                            fontSize={{ base: "12px", md: "12px", lg: "16px" }}
                          >
                            your videos will be private until you publish them
                          </Text>
                          <Button size={"lg"} colorScheme="twitter">
                            Select media
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </CardBody>
              <Box
                borderRadius={"10px"}
                background="white"
                marginTop={"10px"}
                height={"15vh"}
                width={"100%"}
              >
                <Flex
                  height={"119px"}
                  justifyContent={"start"}
                  alignItems="center"
                  paddingX={"30px"}
                  flexDirection="column"
                >
                  <Flex
                    marginTop={"40px"}
                    width={"100%"}
                    justifyContent="space-between"
                  >
                    <Text>Upload</Text>
                    <Text>Details</Text>
                    <Text>Video Elements</Text>
                    <Text>Visibility</Text>
                  </Flex>
                  <Flex
                    width={"100%"}
                    justifyContent={"start"}
                    alignItems="center"
                  >
                    <Box
                      width={"10px"}
                      height="10px"
                      border={"2px solid blue"}
                      background="blue"
                      borderRadius="10px"
                    ></Box>
                    <Box
                      width={"420px"}
                      height="2px"
                      background="grey"
                      alignSelf={"center"}
                    ></Box>
                    <Box
                      width={"10px"}
                      height="10px"
                      border={"2px solid grey"}
                      borderRadius="10px"
                      background="grey"
                    ></Box>
                    <Box
                      width={"430px"}
                      height="2px"
                      background="grey"
                      alignSelf={"center"}
                    ></Box>
                    <Box
                      width={"10px"}
                      height="10px"
                      border={"1px solid black"}
                      borderRadius="10px"
                    ></Box>
                    <Box
                      width={"440px"}
                      height="2px"
                      background="grey"
                      alignSelf={"center"}
                    ></Box>
                    <Box
                      width={"10px"}
                      height="10px"
                      border={"1px solid black"}
                      borderRadius="10px"
                    ></Box>
                  </Flex>

                  {/* <Box
                          width={"100px"}
                          height="2px"
                          background="black"
                          alignSelf={"center"}
                        ></Box> */}
                </Flex>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <Flex justifyContent="center" alignItems={"center"} width="100%">
          <StyledLink href="/">
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              width={"180px"}
            >
              <Image
                src="/main_logo.svg"
                alt="3speak logo"
                width={100}
                height={100}
              />
            </Box>
          </StyledLink>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem color={"#6e707e"} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      {/* _hover=
      {{
        bg: "gray.400",
        color: "white",
      }} */}
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
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
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
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
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const StyledLink = styled(Link)`
  cursor: pointer;
`;
