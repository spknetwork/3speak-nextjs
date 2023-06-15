import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppStore } from "../../lib/store";

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
  FaUserAlt,
  FaUsers,
  FaVideo,
  FaWallet,
} from "react-icons/fa";
import { News } from "@/lib/slices/createStudioSlice";

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
  const { news, video_count, followers_count, views_count } = useAppStore();
  const [mNews, setMNews] = useState<News[]>([]);
  const [mVideoCount, setMVideoCount] = useState<Number>(0);
  const [mFollowersCount, setMFollowersCount] = useState<Number>();
  const [mViewsCount, setMViewsCount] = useState<Number>();

  // get the list of news
  useEffect(() => {
    setMNews(news);
  }, [news]);

  // get total videos
  useEffect(() => {
    setMVideoCount(video_count);
  }, [video_count]);

  // get total followers
  useEffect(() => {
    setMFollowersCount(followers_count);
  }, [followers_count]);

  // get total views count
  useEffect(() => {
    setMViewsCount(views_count);
  }, [views_count]);

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
          <Flex
            marginBottom={"1.5rem"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            {/* for title */}
            <Text
              as={"h1"}
              textTransform="capitalize"
              fontSize={"1.75rem"}
              color="#5a5c69 !important"
              fontWeight={"400 !important"}
              lineHeight="1.2"
            >
              Dashboard
            </Text>

            <Text
              as={"h3"}
              textTransform="inherit"
              fontSize={"1.75rem"}
              color="#5a5c69 !important"
              fontWeight={"400 !important"}
              lineHeight="1.2"
            >
              Welcome back eroyjunehive1!
            </Text>
          </Flex>
          <Box display={"flex"} flexWrap="wrap">
            {/* for 3 cards */}
            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              maxWidth="33.33333%"
            >
              {/* <Box
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"

              ></Box> */}
              <Card
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Uploaded Videos
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mVideoCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaVideo
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>

            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              maxWidth="33.33333%"
            >
              {/* <Box
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"

              ></Box> */}
              <Card
                borderLeft={"0.25rem solid #1cc88a !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Follower
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mFollowersCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaUsers
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
            <Box
              width={"100%"}
              position="relative"
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              flex={"0 0 33.33333%"}
              maxWidth="33.33333%"
            >
              {/* <Box
                borderLeft={"0.25rem solid #4e73df !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"

              ></Box> */}
              <Card
                borderLeft={"0.25rem solid #36b9cc !important"}
                paddingBottom="0.5rem !important"
                paddingTop={"0.5rem !important"}
                boxShadow="0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important"
              >
                <CardBody>
                  <Flex flexWrap={"wrap"} alignItems="center">
                    <Box
                      width={"100%"}
                      marginRight="0.5rem !important"
                      flexBasis={"0"}
                      flexGrow="1"
                      maxWidth={"100%"}
                    >
                      <Text
                        fontSize={".7rem"}
                        color="#4e73df !important"
                        fontWeight={"700 !important"}
                        // textTransform="uppercase !important"
                        marginBottom={"0.25rem !important"}
                      >
                        Views
                      </Text>
                      <Text
                        as={"h5"}
                        color="#5a5c69 !important"
                        fontWeight={"700 !important"}
                        marginBottom="0 !important"
                        fontSize={"1.25rem"}
                        lineHeight="1.2"
                      >
                        <>{mViewsCount}</>
                      </Text>
                    </Box>
                    <Box width={"auto"} flex="0 0 auto" maxWidth={"100%"}>
                      <FaRegEye
                        color="#dddfeb !important"
                        fontWeight={"900"}
                        fontSize="2em"
                      />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          </Box>
          <Box marginTop={"3%"}>
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Card>
                  <CardHeader
                    padding={"0.75rem 1.25rem"}
                    backgroundColor="#f8f9fc"
                    borderBottom={"1px solid #e3e6f0"}
                    paddingTop="1rem !important"
                    paddingBottom={"1rem !important"}
                    borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
                  >
                    <Heading
                      size="md"
                      color={"#4e73df !important"}
                      fontWeight="700 !important"
                      fontSize={"1rem"}
                      lineHeight="1.2"
                    >
                      News
                    </Heading>
                  </CardHeader>

                  <CardBody flex={"1 1 auto"} padding="1.25rem">
                    {mNews?.map((news, index) => (
                      <Box key={index}>
                        <Card
                          key={index}
                          marginTop={"4%"}
                          position="relative"
                          wordBreak="break-word"
                          backgroundClip={"border-box"}
                          border="1px solid #e3e6f0"
                          borderRadius={"0.35rem"}
                        >
                          <CardBody display={"flex"} flexDirection={"column"}>
                            <Link
                              color={"#4e73df"}
                              textDecoration="none"
                              backgroundColor={"transparent"}
                            >
                              <Text
                                as={"h4"}
                                marginBottom="0.5rem"
                                fontWeight={"400"}
                                lineHeight="1.2"
                                fontSize={"1.5rem"}
                              >
                                {news.title}
                              </Text>
                            </Link>
                            <Text textAlign={"left"} as={"small"}>
                              {news.description}
                            </Text>
                          </CardBody>
                        </Card>
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              </Box>
              <Box>
                <Card>
                  <CardHeader
                    padding={"0.75rem 1.25rem"}
                    backgroundColor="#f8f9fc"
                    borderBottom={"1px solid #e3e6f0"}
                    paddingTop="1rem !important"
                    paddingBottom={"1rem !important"}
                    borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
                  >
                    <Heading
                      size="md"
                      color={"#4e73df !important"}
                      fontWeight="700 !important"
                      fontSize={"1rem"}
                      lineHeight="1.2"
                    >
                      Twitter Feed
                    </Heading>
                  </CardHeader>

                  <CardBody flex={"1 1 auto"} padding="1.25rem"></CardBody>
                </Card>
              </Box>
            </SimpleGrid>
            {/* for left content and right content */}
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
