
  import Image from "next/image";
  import Link from "next/link";
  import {Icon} from "@chakra-ui/react";
  import React, { useEffect, useRef, useState } from "react";
  import styled from "styled-components";
  import { Box as BoxContainer } from "./Box";
  import { Flex as FlexComponent } from "./Flex";
  import { Typography } from "./Typography";
  import { useTranslation } from "next-export-i18n";
  import { useRouter } from "next/router";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
  import {
    faAndroid,
    faAppStore,
    faAppStoreIos,
    faDiscord,
    faTelegram,
    faTwitter,
  } from "@fortawesome/free-brands-svg-icons";
  import { faMobileAndroid } from "@fortawesome/free-solid-svg-icons";
  import {
    Button,
    Flex,
    Menu,
    Box as ChakraBox,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Avatar,
    ModalContent,
    ModalFooter,
    IconButton,
    useColorModeValue,
    useColorMode,
    Input,
    Box,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
  import{ NAVIGATION } from "../components/data/NavigationData";
  import { useMediaQuery } from "react-responsive";
  import { css } from "@emotion/react";
  import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
  import { FaAppStoreIos, FaInfo, FaInfoCircle } from "react-icons/fa";
  import { api } from "@/utils/api";
  import { useAppStore } from "../lib/store";
  import { IconProp } from "@fortawesome/fontawesome-svg-core";
  import { AiFillAndroid } from "react-icons/ai";
  import { MdClose } from "react-icons/md";
  import AccountsList from "./Modal/AccountsList";
  import SignInModal from "./Modal/SignInModal";
  const threespeak = {
    filter: "drop-shadow(2px 4px 6px black)",
  };
  const threespeak_light = {
    filter: "drop-shadow(2px 4px 6px black)",
  };
  // juneroy
  const navblog = {
    filter: "brightness(1)",
  };
  const navblog_light = {
    filter: "brightness(0.50)",
  };
 
  const faAndroidIcon = faAndroid as IconProp;
  const faAppStoreIosIcon = faAppStoreIos as IconProp;
  const faDiscordIcon = faDiscord as IconProp;
  const faTelegramIcon = faTelegram as IconProp;
  const faTwitterIcon = faTwitter as IconProp;

  export const Sidebar = () => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const { colorMode, toggleColorMode } = useColorMode();

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

    // const { listAccounts, setAccounts } = useAppStore();
    const addAccounts = () => {
      console.log("addAccounts");
      // show modal list of accounts available
      onCloseModal1();
      onOpenModal2();
    };
    const router = useRouter();
    const [communitiesPopup, setCommunitiesPopup] = useState(false);
    const [search, setSearch] = useState("");
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const [showNav, setShowNav] = useState(true);

    const {
      allowAccess,
      userDetails,
      userhiveDetails,
      listAccounts,
      setAccounts,
      getUserDetails,
      getUserHiveDetails,
    } = useAppStore();
    // const isMedium = useBreakpointValue({ base: false, md: true });
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    // const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
      if (allowAccess == true) {
        setAuthenticated(allowAccess);
        // return
      } else {
        setAuthenticated(false);
      }

      console.log("authenticated", authenticated);
    }, [allowAccess, authenticated]);

    useEffect(() => {
      console.log("isMobile", isMobile);
      if (isMobile) {
        setShowNav(true);
        console.log("showNav", showNav);
      } else {
        setShowNav(false);
        console.log("showNav", showNav);
      }
    }, [isMobile, showNav]);

    useEffect(() => {
      console.log("userhiveDetails in sidebar profile_image", userhiveDetails);
    }, [userhiveDetails]);

    // useEffect(() => {
    //   if (allowAccess == true) {
    //     getUserDetails()
    //   }
    // }, [allowAccess,getUserDetails]);
    useEffect(() => {
      if (userDetails?.username) {
        console.log("userhiveDetails in sidebar profile_image", userDetails);

        getUserHiveDetails(`${userDetails?.username}`);
      }
    }, [getUserHiveDetails, userDetails]);
    const addAccountsNow = () => {
      console.log("addAccountsNow", addAccountsNow);
    };
    const removeAccount = (account: any, index: number) => {
      listAccounts.splice(index, 1);
      console.log("listAccounts", listAccounts);
      localStorage.setItem("accountsList", JSON.stringify(listAccounts));
      setAccounts();
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement | null>(null);

    return (
      <Box>
        <Button ref={btnRef} colorScheme="grey.100" textColor={colorMode === "dark" ? "white" : "black"} onClick={onOpen} fontSize={"3xl"}>
        <TbLayoutSidebarRightCollapseFilled />
        </Button>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />

              <Flex p="1rem" flexDirection="column">
                <Flex
                  css={css`
                    @media (max-width: 768px) {
                      justify-content: space-between;
                    }

                    @media (min-width: 769px) {
                      justify-content: center;
                    }
                  `}
                  width="100%"
                >
                  <Link style={{ cursor: "pointer" }} href="/">
                    <ChakraBox width={"180px"}>
                      <Image
                        loader={() =>
                          `${
                            colorMode == "dark"
                              ? "/main_logo_light.svg"
                              : "/main_logo.svg"
                          }`
                        }
                        src={
                          colorMode == "dark"
                            ? "/main_logo_light.svg"
                            : "/main_logo.svg"
                        }
                        alt="3speak logo"
                        width={200}
                        height={100}
                      />
                    </ChakraBox>
                  </Link>
                  {isMobile && (
                    <Button
                      variant={"outline"}
                      onClick={() => setShowNav(!showNav)}
                      colorScheme="blackAlpha"
                    >
                      <HamburgerIcon boxSize={"3rem"} />
                    </Button>
                  )}
                </Flex>
                {!showNav && (
                  <ChakraBox>
                    <ChakraBox mb="1rem" width="100%">
                      {!authenticated && (
                        <Link href="/auth/modals">
                          <Button
                            bg={bgColor}
                            marginBottom={"10px"}
                            boxShadow={"0 1px 4px rgb(0 0 0 / 40%)"}
                            width="90%"
                            textAlign={"center"}
                            cursor="pointer"
                            py={3}
                          >
                            {t("mainLogin")}
                          </Button>
                        </Link>
                      )}

                      {authenticated && (
                        <Flex flexDirection={"column"}>
                          <ChakraBox>
                            <Flex
                              cursor={"pointer"}
                              justifyContent={"center"}
                              alignItems="center"
                            >
                              <Flex
                                onClick={() =>
                                  router.push(
                                    `/user/${userDetails?.username?.toLocaleLowerCase()}`
                                  )
                                }
                                margin="10px"
                                justifyContent={"center"}
                                alignItems="center"
                                cursor={"pointer"}
                                borderRadius={"50%"}
                                height={"100%"}
                                width="40px"
                                border={"1px solid white"}
                              >
                                <Image
                                  alt="sidebar avatar"
                                  loader={() => {
                                    return userhiveDetails?.profile_image
                                      ? userhiveDetails?.profile_image
                                      : `/images/avatar3.png`;
                                  }}
                                  width="100"
                                  height={"100"}
                                  src={
                                    userhiveDetails?.profile_image
                                      ? userhiveDetails?.profile_image
                                      : `/images/avatar3.png`
                                  }
                                  style={{
                                    margin: "0",
                                    width: "40px",
                                    borderRadius: "100px",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Flex>

                              <Text
                                onClick={() =>
                                  router.push(
                                    `/user/${userDetails?.username?.toLocaleLowerCase()}`
                                  )
                                }
                                marginLeft={"5px"}
                                margin={"0px"}
                                marginRight={"8px"}
                                textAlign={"center"}
                                as="h5"
                              >
                                {userDetails?.username?.toLocaleUpperCase()}
                              </Text>
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  aria-label="Options"
                                  icon={<ChevronDownIcon />}
                                  variant="outline"
                                />
                                {/* <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                          </MenuButton> */}
                                <MenuList>
                                  <MenuItem
                                    onClick={() => {
                                      localStorage.removeItem("access_token"); //
                                      if (colorMode == "dark") {
                                        toggleColorMode();
                                      }

                                      // in order to reset the localstorage it needs to refresh the whole page
                                      location.reload();
                                    }}
                                  >
                                    Logout
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Flex>
                          </ChakraBox>
                          <Link href="/studio">
                            <Button
                              bg={bgColor}
                              boxShadow={"0 1px 4px rgb(0 0 0 / 40%)"}
                              width="90%"
                              textAlign={"center"}
                              cursor="pointer"
                              py={3}
                            >
                              Uplaod Video
                            </Button>
                          </Link>
                        </Flex>
                      )}
                      <Flex
                        cursor={"pointer"}
                        width={"100%"}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <ChakraBox onClick={onOpenModal1}>
                          Switch Account
                        </ChakraBox>
                      </Flex>
                    </ChakraBox>
                    <ChakraBox>
                      {NAVIGATION.map(({ icon, title, route }) => (
                        <StyledNav
                          onClick={() =>
                            route ? router.push(route) : setCommunitiesPopup(true)
                          }
                          width="100%"
                          py="1rem"
                          px="0.5rem"
                          key={`nav_sidebar_${title}`}
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <ChakraBox mr="1rem" maxWidth="25px">
                            {title == "download_apps" && (
                              // <FaAppStoreIos size={"2rem"} color={colorMode === 'dark' ? 'white' : 'black'} />
                              <ChakraBox width={"auto"}>
                                <Link
                                  target="_blank"
                                  href="https://testflight.apple.com/join/0tipqwsZ"
                                >
                                  {/* <faAppStoreIos/> */}
                                  <FaAppStoreIos
                                    size={"2rem"}
                                    color={
                                      colorMode === "dark" ? "white" : "black"
                                    }
                                  />
                                  {/* <FontAwesomeIcon
                  
                  className="fa-2x text-secondary ms-3"
                  icon={faAppStoreIosIcon}
                /> */}
                                </Link>
                              </ChakraBox>
                            )}

                            {title == "about_3speak" && (
                              <FaInfoCircle
                                size={"1.5rem"}
                                color={colorMode === "dark" ? "white" : "black"}
                              />
                            )}

                            {title != "download_apps" &&
                              title != "about_3speak" && (
                                // <Image
                                //   src={`/${
                                //     colorMode == "dark" ? img_light : img
                                //   }`}
                                //   alt={title}
                                //   width={30}
                                //   height={30}
                                // />
                                <Icon
                                as={icon}
                                width={30}
                                height={30}
                                />
                              )}
                          </ChakraBox>
                          {title == "download_apps" && (
                            <ChakraBox position="relative">
                              <Menu>
                                <MenuButton
                                  color={colorMode === "dark" ? "white" : "black"}
                                >
                                  Download 3Speak Apps
                                </MenuButton>
                                <MenuList
                                  display={"flex"}
                                  flexDirection="column"
                                  justifyContent={"center"}
                                  alignItems="center"
                                  boxShadow={"0 1px 4px rgba(0,0,0,0.3)"}
                                  background="#eff4f6"
                                  width={"200px"}
                                  left="-40px"
                                  position="absolute" // or position="absolute"
                                  zIndex="100" // or any higher value
                                >
                                  <MenuGroup
                                    marginTop={"10px"}
                                    title="Download 3Speak Apps"
                                    fontWeight={"bold"}
                                    fontSize="13px"
                                  >
                                    <MenuItem
                                      paddingTop={"5px"}
                                      paddingBottom={"10px"}
                                    >
                                      iOS App
                                    </MenuItem>
                                    <MenuItem paddingBottom={"10px"}>
                                      Android App
                                    </MenuItem>
                                    <MenuItem paddingBottom={"10px"}>
                                      Desktop App
                                    </MenuItem>
                                  </MenuGroup>
                                </MenuList>
                              </Menu>
                            </ChakraBox>
                            // <Menu>
                            //   <MenuButton>Download 3Speak Apps</MenuButton>
                            //   <MenuList
                            //     boxShadow={"0 1px 4px rgba(0,0,0,0.3)"}
                            //     border="none"
                            //     padding={"10px"}
                            //     width="180px"
                            //   >
                            //     <MenuGroup
                            //       title="Download 3Speak Apps"
                            //       fontWeight={"bold"}
                            //       fontSize="13px"
                            //     >
                            //       <MenuItem>iOS App</MenuItem>
                            //       <MenuItem>Android App </MenuItem>
                            //       <MenuItem>Desktop App </MenuItem>
                            //     </MenuGroup>
                            //   </MenuList>
                            // </Menu>
                          )}
                          {/* {title == "nav.communities" && (
                    <ChakraBox position="relative">
                      <Menu>
                        <MenuButton>Communities</MenuButton>
                        <MenuList
                          display={"flex"}
                          flexDirection="column"
                          justifyContent={"center"}
                          alignItems="center"
                          boxShadow={"0 1px 4px rgba(0,0,0,0.3)"}
                          background="#eff4f6"
                          width={"200px"}
                          left="-40px"
                          position="absolute" // or position="absolute"
                          zIndex="100" // or any higher value
                        >
                          <MenuGroup
                            marginTop={"10px"}
                            title="Communities"
                            fontWeight={"bold"}
                            fontSize="13px"
                          >
                            <MenuItem paddingTop={"5px"} paddingBottom={"10px"}>
                              Create
                            </MenuItem>
                            <MenuItem paddingBottom={"10px"}>
                              <Link href={"/communities"}>All Communities</Link>
                            </MenuItem>
                            <MenuItem paddingBottom={"10px"}>Threespeak</MenuItem>
                            <MenuItem paddingBottom={"10px"}>
                              Citizen Journalist
                            </MenuItem>
                            <MenuItem paddingBottom={"10px"}>
                              Threeshorts
                            </MenuItem>
                            <MenuItem paddingBottom={"10px"}>
                              Coronavirus Pandemic
                            </MenuItem>
                            <MenuItem paddingBottom={"10px"}>Covid-19</MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </Menu>
                    </ChakraBox>
                  )} */}
                          {title == "about_3speak" && (
                            <ChakraBox position="relative">
                              <Menu>
                                <MenuButton
                                  color={colorMode === "dark" ? "white" : "black"}
                                >
                                  About 3Speak {colorMode}
                                </MenuButton>
                                <MenuList
                                  display={"flex"}
                                  flexDirection="column"
                                  justifyContent={"center"}
                                  alignItems="center"
                                  boxShadow={"0 1px 4px rgba(0,0,0,0.3)"}
                                  background="#eff4f6"
                                  width={"200px"}
                                  left="-40px"
                                  position="absolute" // or position="absolute"
                                  zIndex="100" // or any higher value
                                >
                                  <MenuGroup
                                    marginTop={"10px"}
                                    title="About 3Speak"
                                    fontWeight={"bold"}
                                    fontSize="13px"
                                  >
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingTop={"5px"}
                                      paddingBottom={"10px"}
                                    >
                                      About Us
                                    </MenuItem>
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingBottom={"10px"}
                                    >
                                      FAQ
                                    </MenuItem>
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingBottom={"10px"}
                                    >
                                      Telegram
                                    </MenuItem>
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingBottom={"10px"}
                                    >
                                      Discord
                                    </MenuItem>
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingBottom={"10px"}
                                    >
                                      Twitter
                                    </MenuItem>
                                    <MenuItem
                                      color={
                                        colorMode === "dark" ? "white" : "black"
                                      }
                                      paddingBottom={"10px"}
                                    >
                                      3Speak - important links
                                    </MenuItem>
                                    <MenuItem paddingBottom={"10px"}>
                                      SPK network
                                    </MenuItem>
                                    <MenuItem paddingBottom={"10px"}>
                                      SPK network - important link
                                    </MenuItem>
                                  </MenuGroup>
                                </MenuList>
                              </Menu>
                            </ChakraBox>
                          )}
                          {title != "download_apps" &&
                            title != "about_3speak" && (
                              <Typography
                                color={colorMode === "dark" ? "white" : "black"}
                              >
                                {t(title)}
                              </Typography>
                            )}
                        </StyledNav>
                      ))}
                    </ChakraBox>
                  </ChakraBox>
                )}

                {!showNav && (
                  <ChakraBox>
                    <Flex width="100%" alignItems="center" mt="1rem">
                      <ChakraBox maxWidth="2rem">
                        <Image
                          alt="search icon"
                          loader={() =>
                            `${
                              colorMode == "dark"
                                ? "/nav/search_light.svg"
                                : "/nav/search.svg"
                            }`
                          }
                          src={
                            colorMode == "dark"
                              ? "/nav/search_light.svg"
                              : "/nav/search.svg"
                          }
                          width={45}
                          height={45}
                        />
                      </ChakraBox>
                      <Input
                        color={colorMode === "dark" ? "white" : "black"}
                        focusBorderColor={
                          colorMode === "dark" ? "white" : "black"
                        }
                        variant="flushed"
                        outline="none"
                        border={"none"}
                        borderBottom={"1px solid rgba(0, 0, 0, 0.5)"}
                        padding={"1rem 0.5rem 0.5rem"}
                        marginLeft={"0.5rem"}
                        marginBottom={"1rem"}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          router.push(`/search?q=${search.split(" ").join("+")}`)
                        }
                        placeholder="Search"
                        type="text"
                      />
                    </Flex>
                    <Typography mb="0.5rem" mt="1rem">
                      3Speak
                    </Typography>
                    <ChakraBox ml="0.5rem" mt="1rem">
                      <AboutText
                        onClick={() => router.push("/about-us")}
                        color={colorMode === "dark" ? "white" : "black"}
                        mb="1rem"
                      >
                        {/* color="rgba(0,0,0,0.5)" */}

                        {t("aboutUs")}
                      </AboutText>
                      <AboutText
                        onClick={() => router.push("/faq")}
                        color={colorMode === "dark" ? "white" : "black"}
                        mb="1rem"
                      >
                        {t("faq")}
                      </AboutText>
                    </ChakraBox>
                  </ChakraBox>
                )}

                {!showNav && (
                  <ChakraBox className="nav-item text-center d-flex justify-content-center align-items-center flex-wrap">
                    <ChakraBox width={"40px"}>
                      <Link
                        target="_blank"
                        href="https://twitter.com/3speakonline?utm_source=3speak.tv"
                      >
                        <FontAwesomeIcon
                          className="fa-2x text-secondary ms-3 mb-1"
                          icon={faTwitterIcon}
                          filter={
                            colorMode == "dark"
                              ? "brightness(4)"
                              : "brightness(0.50)"
                          }
                        />
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"40px"}>
                      <Link
                        target="_blank"
                        href="https://t.me/threespeak?utm_source=3speak.tv"
                      >
                        <FontAwesomeIcon
                          className="fa-2x text-secondary ms-3 mb-1"
                          icon={faTelegramIcon}
                          filter={
                            colorMode == "dark"
                              ? "brightness(4)"
                              : "brightness(0.50)"
                          }
                        />
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"40px"}>
                      <Link target="_blank" href="https://discord.gg/NSFS2VGj83">
                        <FontAwesomeIcon
                          className="fa-2x text-secondary ms-3 mb-1"
                          icon={faDiscordIcon}
                          filter={
                            colorMode == "dark"
                              ? "brightness(4)"
                              : "brightness(0.50)"
                          }
                        />
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"40px"}>
                      <Link
                        target="_blank"
                        title="Visit Our Blog"
                        href="https://hive.blog/@threespeak"
                      >
                        <span className="ms-3">
                          <Image
                            src="/nav/blog.png"
                            alt={"3speak blog"}
                            width={30}
                            height={30}
                            style={colorMode == "dark" ? navblog : navblog_light}
                          />
                        </span>
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"40px"}>
                      <Link
                        target="_blank"
                        title="SPK Network"
                        href="https://spk.network"
                      >
                        <span className="ms-3">
                          <Image
                            src="/nav/spk_network.png"
                            alt={"SPK Network"}
                            width={30}
                            height={30}
                            style={
                              colorMode == "dark" ? threespeak : threespeak_light
                            }
                          />
                        </span>
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"auto"}>
                      <Link
                        target="_blank"
                        href="https://testflight.apple.com/join/0tipqwsZ"
                      >
                        {/* <faAppStoreIos/> */}
                        <FaAppStoreIos
                          size={"2.4rem"}
                          filter={
                            colorMode == "dark"
                              ? "brightness(4)"
                              : "brightness(0.6)"
                          }
                        />
                        {/* <FontAwesomeIcon
                  
                  className="fa-2x text-secondary ms-3"
                  icon={faAppStoreIosIcon}
                /> */}
                      </Link>
                    </ChakraBox>
                    <ChakraBox width={"40px"}>
                      <Link
                        target="_blank"
                        href="https://appdistribution.firebase.dev/i/047cfb506633e639"
                      >
                        <AiFillAndroid
                          className="fa-2x text-secondary ms-3"
                          width={"100"}
                          size="30"
                          filter={
                            colorMode == "dark"
                              ? "brightness(4)"
                              : "brightness(0.50)"
                          }
                        />
                        {/* <FontAwesomeIcon
                className="fa-2x text-secondary ms-3"
                icon={faAndroidIcon}
              /> */}
                      </Link>
                    </ChakraBox>
                  </ChakraBox>
                )}
                <AccountsList
                  isOpenModal1={isOpenModal1}
                  onCloseModal1={onCloseModal1}
                  listAccounts={listAccounts}
                  addAccounts={addAccounts}
                />
                <SignInModal
                  isOpenModal2={isOpenModal2}
                  onCloseModal2={onCloseModal2}
                  addAccountsNow={addAccountsNow}
                />
              </Flex>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    );
  };

  const AboutText = styled(Typography)`
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      color: black;
    }
  `;

  // const StyledLink = styled(Link)`
  //   cursor: pointer;
  // `;

  // const StyledInput = styled.input`
  //   width: 100% !important;
  //   outline: none;
  //   border: none;
  //   border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  //   padding: 1rem 0.5rem 0.5rem;
  //   margin-left: 0.5rem;
  //   margin-bottom: 1rem;
  // `;

  const StyledNav = styled(FlexComponent)`
    cursor: pointer;
    transition: all 0.25s ease-in;

    &:hover {
      color: black;
    }
  `;

  // const StyledImage = styled(Image)`
  //   svg {
  //     color: rgba(0, 0, 0, 0.5);
  //   }
  // `;

  // const StyledButton = styled(BoxContainer)`
  //   box-shadow: 0 1px 4px rgb(0 0 0 / 40%);
  //   width: 100%;
  //   text-align: center;
  //   cursor: pointer;
  // `;
