import { Box, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";

import { css } from "@emotion/react";
import React from "react";
import { BiEnvelope, BiGlobe } from "react-icons/bi";
const FOOTER_TITLE = [{ name: "About us" }, { name: "FAQ" }, { name: "Terms" }];
const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w={"full"}>
      <Box
        padding="5px"
        marginBottom={"10px"}
        paddingTop={"10px"}
        marginTop={"auto"}
      >
        <Box
          paddingX={"15px"}
          marginX={"auto"}
          maxWidth="1140px"
          width={"100%"}
          margin="auto"
        >
          <Flex width={"100%"} flexWrap="wrap">
            <Box
              css={css`
                @media (max-width: 768px) {
                  flex: 0 0 44%;
                  max-width: 44%;
                  padding: 0px 20px;
                }

                @media (min-width: 769px) {
                  flex: 0 0 25%;
                  max-width: 25%;
                  padding: 0px 20px;
                }
              `}
            >
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
              <Link href="#">
                <Flex alignItems={"center"}>
                  <BiEnvelope />
                  <Text fontWeight={"bold"} margin={"0px"}>
                    helpdesk@3speak.tv
                  </Text>
                </Flex>
              </Link>
              <Link href="#">
                <Flex alignItems={"center"}>
                  <BiGlobe />
                  <Text fontWeight={"bold"} margin={"0px"}>
                    3speak.tv
                  </Text>
                </Flex>
              </Link>
            </Box>
            <Box
              css={css`
                @media (max-width: 768px) {
                  flex: 0 0 44%;
                  max-width: 44%;
                  padding: 0px 20px;
                }

                @media (min-width: 769px) {
                  flex: 0 0 25%;
                  max-width: 25%;
                  padding: 0px 20px;
                }
              `}
            >
              <Text fontWeight={"bold"} margin={"0px"} marginBottom="20px">
                Company
              </Text>
              {FOOTER_TITLE.map((footer: any, index: number) => {
                return (
                  <Link key={index} href="#">
                    <Text fontWeight={"500"} margin={"0px"}>
                      {footer.name}
                    </Text>
                  </Link>
                );
              })}
            </Box>
            <Box
              css={css`
                @media (max-width: 768px) {
                  flex: 0 0 44%;
                  max-width: 44%;
                  padding: 0px 20px;
                  padding-top: 5px;
                }

                @media (min-width: 769px) {
                  flex: 0 0 25%;
                  max-width: 25%;
                  padding: 0px 20px;
                }
              `}
            >
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
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
