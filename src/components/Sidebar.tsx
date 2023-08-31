import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "./Box";
// import { Flex } from "./Flex";
import { Typography } from "./Typography";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import { css } from "@emotion/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaAppStoreIos, FaInfo, FaInfoCircle } from "react-icons/fa";
import { api } from "@/utils/api";
import { useAppStore } from '../lib/store'
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const threespeak = {
  filter: "drop-shadow(2px 4px 6px black)",
};
// juneroy
const navblog = {
  filter: "brightness(0.45)",
};
const NAVIGATION = [
  {
    img: "nav/home.svg",
    title: "nav.home",
    route: "/",
  },
  {
    img: "nav/smile.svg",
    title: "nav.first",
    route: "/first_upload",
  },
  {
    img: "nav/fire.svg",
    title: "nav.trending",
    route: "/trends",
  },
  {
    img: "nav/play.svg",
    title: "nav.new",
    route: "/new",
  },

  {
    img: "nav/communities.svg",
    title: "nav.communities",
    route: "communities",
  },
  {
    img: "nav/leaderboard.svg",
    title: "nav.leaderboard",
    route: "/leaderboard",
  },
  {
    img: "nav/download.svg",
    title: "download_apps",
  },
  {
    img: "nav/spk_network.png",
    title: "about_3speak",
  },
];

const faAndroidIcon = faAndroid as IconProp;
const faAppStoreIosIcon = faAppStoreIos as IconProp;
const faDiscordIcon = faDiscord as IconProp;
const faTelegramIcon = faTelegram as IconProp;
const faTwitterIcon = faTwitter as IconProp;

export const Sidebar = () => {
  const router = useRouter();
  const [communitiesPopup, setCommunitiesPopup] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [showNav, setShowNav] = useState(true);

  const { allowAccess,userDetails } = useAppStore();
  // const isMedium = useBreakpointValue({ base: false, md: true });
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (allowAccess == true) {
      setAuthenticated(allowAccess)
      // return
    } else {
      setAuthenticated(false)
    }

    console.log('authenticated', authenticated)

  }, [allowAccess]);


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
  return (
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
        <StyledLink href="/">
          <Box width={"180px"}>
            <Image
              src="/main_logo.svg"
              alt="3speak logo"
              width={200}
              height={100}
            />
          </Box>
        </StyledLink>
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
        <Box>
          <Box mb="1rem" width="100%">
            {!authenticated && (
              <Link href="/auth/login">
                <StyledButton py={3}>{t("mainLogin")}</StyledButton>
              </Link>
            )}

            {authenticated && (
              <Flex flexDirection={'column'}>

                <ChakraBox>
                  <Text textAlign={'center'} as='h5'>
                    {userDetails?.username?.toLocaleUpperCase()}
                  </Text>
                </ChakraBox>
                <Link href="/studio">
                  <StyledButton py={3}>Upload Video</StyledButton>
                </Link>
              </Flex>

            )}
          </Box>
          <Box>
            {NAVIGATION.map(({ img, title, route }) => (
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
                <Box mr="1rem" maxWidth="25px">
                  {title == "download_apps" && (
                    <FaAppStoreIos size={"2rem"} color="black" />
                  )}

                  {title == "about_3speak" && (
                    <FaInfoCircle size={"1.5rem"} color="black" />
                  )}

                  {title != "download_apps" && title != "about_3speak" && (
                    <StyledImage
                      src={`/${img}`}
                      alt={title}
                      width={30}
                      height={30}
                    />
                  )}
                </Box>
                {title == "download_apps" && (
                  <Box position="relative">
                    <Menu>
                      <MenuButton>Download 3Speak Apps</MenuButton>
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
                          <MenuItem paddingTop={"5px"} paddingBottom={"10px"}>
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
                  </Box>
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
                  <Box position="relative">
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
                  </Box>
                )} */}
                {title == "about_3speak" && (
                  <Box position="relative">
                    <Menu>
                      <MenuButton>About 3Speak</MenuButton>
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
                          <MenuItem paddingTop={"5px"} paddingBottom={"10px"}>
                            About Us
                          </MenuItem>
                          <MenuItem paddingBottom={"10px"}>FAQ</MenuItem>
                          <MenuItem paddingBottom={"10px"}>Telegram</MenuItem>
                          <MenuItem paddingBottom={"10px"}>Discord</MenuItem>
                          <MenuItem paddingBottom={"10px"}>Twitter</MenuItem>
                          <MenuItem paddingBottom={"10px"}>
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
                  </Box>
                )}
                {title != "download_apps" && title != "about_3speak" && (
                  <Typography>{t(title)}</Typography>
                )}
              </StyledNav>
            ))}
          </Box>
        </Box>
      )}

      {!showNav && (
        <Box>
          <Flex width="100%" alignItems="center" mt="1rem">
            <Box maxWidth="2rem">
              <Image
                alt="search icon"
                src="/nav/search.svg"
                width={45}
                height={45}
              />
            </Box>
            <StyledInput
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
          <Box ml="0.5rem" mt="1rem">
            <AboutText
              onClick={() => router.push("/about-us")}
              color="rgba(0,0,0,0.5)"
              mb="1rem"
            >
              {t("aboutUs")}
            </AboutText>
            <AboutText
              onClick={() => router.push("/faq")}
              color="rgba(0,0,0,0.5)"
              mb="1rem"
            >
              {t("faq")}
            </AboutText>
          </Box>
        </Box>
      )}

      {!showNav && (
        <Box className="nav-item text-center ">
          <Link
            target="_blank"
            href="https://twitter.com/3speakonline?utm_source=3speak.tv"
          >
            <FontAwesomeIcon
              className="fa-2x text-secondary ms-3 mb-1"
              icon={faTwitterIcon}
            />
          </Link>
          <Link
            target="_blank"
            href="https://t.me/threespeak?utm_source=3speak.tv"
          >
            <FontAwesomeIcon
              className="fa-2x text-secondary ms-3 mb-1"
              icon={faTelegramIcon}
            />
          </Link>
          <Link target="_blank" href="https://discord.gg/NSFS2VGj83">
            <FontAwesomeIcon
              className="fa-2x text-secondary ms-3 mb-1"
              icon={faDiscordIcon}
            />
          </Link>
          <Link
            target="_blank"
            title="Visit Our Blog"
            href="https://hive.blog/@threespeak"
          >
            <span className="ms-3">
              <StyledImage
                src="/nav/blog.png"
                alt={"3speak blog"}
                width={30}
                height={30}
                style={navblog}
              />
            </span>
          </Link>
          <Link target="_blank" title="SPK Network" href="https://spk.network">
            <span className="ms-3">
              <StyledImage
                src="/nav/spk_network.png"
                alt={"SPK Network"}
                width={30}
                height={30}
                style={threespeak}
              />
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://testflight.apple.com/join/0tipqwsZ"
          >
            <FontAwesomeIcon
              className="fa-2x text-secondary ms-3"
              icon={faAppStoreIosIcon}
            />
          </Link>
          <Link
            target="_blank"
            href="https://appdistribution.firebase.dev/i/047cfb506633e639"
          >
            <FontAwesomeIcon
              className="fa-2x text-secondary ms-3"
              icon={faAndroidIcon}
            />
          </Link>
        </Box>
      )}
    </Flex>
  );
};

const AboutText = styled(Typography)`
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    color: black;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 100% !important;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 1rem 0.5rem 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledNav = styled(Flex)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  transition: all 0.25s ease-in;

  svg {
    path {
      fill: rgba(0, 0, 0, 0.5);
    }
  }

  &:hover {
    color: black;
  }
`;

const StyledImage = styled(Image)`
  svg {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledButton = styled(Box)`
  box-shadow: 0 1px 4px rgb(0 0 0 / 40%);
  width: 100%;
  text-align: center;
  cursor: pointer;
`;
