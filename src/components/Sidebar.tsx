import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "./Box";
import { Flex } from "./Flex";
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

const NAVIGATION = [
  {
    img: "nav/home.svg",
    title: "nav.home",
    route: "/",
  },
  {
    img: "nav/smile.svg",
    title: "nav.first",
    route: "/newcomers",
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
    img: "nav/download.svg",
    title: "nav.desktop",
    route: "https://github.com/3speaknetwork/3Speak-app/releases/tag/v0.1.20",
  },
  {
    img: "nav/communities.svg",
    title: "nav.communities",
    route: "/communities",
  },
  {
    img: "nav/leaderboard.svg",
    title: "nav.leaderboard",
    route: "/leaderboard",
  },
];

export const Sidebar = () => {
  const router = useRouter();
  const [communitiesPopup, setCommunitiesPopup] = useState(false);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  return (
    <Flex p="1rem" flexDirection="column">
      <Flex justifyContent="center" width="100%">
        <StyledLink href="/">
          <Box maxWidth="10.75rem">
            <Image
              src="/main_logo.svg"
              alt="3speak logo"
              width={200}
              height={100}
            />
          </Box>
        </StyledLink>
      </Flex>
      <Box mb="1rem" width="100%">
        {null}
        {/* {user ? (
          <>Hello {user.name}</>
        ) : (
          <Link href="/auth/login">
            <StyledButton py={3}>{t("mainLogin")}</StyledButton>
          </Link>
        )} */}
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
              <StyledImage src={`/${img}`} alt={title} width={30} height={30} />
            </Box>
            <Typography>{t(title)}</Typography>
          </StyledNav>
        ))}
      </Box>
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
      <Box ml="0.5rem" mt="1rem">
        <a
          className="keychainify-checked"
          target="_blank"
          href="https://twitter.com/3speakonline?utm_source=3speak.tv"
        >
          <FontAwesomeIcon className="fa-2x" icon={faTwitter} />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          href="https://t.me/threespeak?utm_source=3speak.tv"
        >
          <FontAwesomeIcon className="fa-2x" icon={faTelegram} />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          href="https://discord.gg/NSFS2VGj83"
        >
          <FontAwesomeIcon className="fa-2x" icon={faDiscord} />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          title="Visit Our Blog"
          href="https://hive.blog/@threespeak"
        >
          <StyledImage
            src="/nav/blog.png"
            alt={"3speak blog"}
            width={30}
            height={30}
          />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          title="SPK Network"
          href="https://spk.network"
        >
          <StyledImage
            src="/nav/spk_network.png"
            alt={"SPK Network"}
            width={30}
            height={30}
          />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          href="https://testflight.apple.com/join/0tipqwsZ"
        >
          <FontAwesomeIcon className="fa-2x" icon={faAppStoreIos} />
        </a>
        <a
          className="ml-2 keychainify-checked"
          target="_blank"
          href="https://appdistribution.firebase.dev/i/047cfb506633e639"
        >
          <FontAwesomeIcon className="fa-2x" icon={faAndroid} />
        </a>
      </Box>
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
