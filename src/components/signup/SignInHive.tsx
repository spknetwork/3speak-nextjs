import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Flex } from "src/components";
import { Button, Box, Text } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import { AuthActions } from "@/hooks/auth";
import { Providers } from "@aioha/aioha";
import { useRouter } from "next/router";

const SignInHive = ({ requestHiveLogin, username, setUsername }: any) => {
  const router = useRouter();
  return (
    <Box width="100%">
      <Box>
        <Text as="h2" textAlign={"center"}>
          Login to 3Speak
        </Text>
        <Text textAlign={"center"}>
          Select one of the supported login options that help keep your access
          safe and decentralized.
        </Text>
      </Box>
      <Box mx="auto" maxWidth="9rem">
        <Image
          loader={() =>
            "https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          }
          src="https://s3.eu-central-1.wasabisys.com/data.int/logo_player.png"
          alt="3speak logo"
          width="100"
          height={"100"}
        />
      </Box>
      <form onSubmit={(e) => requestHiveLogin(e)}>
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
            <Image
              width={"100"}
              height="100"
              src="/keychain.6846c271.png"
              alt="3speak logo"
            />
          </Flex>
          <Box
            marginRight={{ base: "10px", md: "10px", lg: "5px" }}
            mt="1rem"
            width="100%"
          >
            <fieldset className="Fieldset2">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="Input2"
                id="text"
                placeholder="Enter username"
                type="text"
              />
            </fieldset>
          </Box>
          <Box mt="1rem" width="auto">
            <Button
              type="submit"
              height={"92%"}
              onClick={() =>
                AuthActions.login("Hive", Providers.Keychain, username)
                  .then(() => {
                    router.push("/");
                  })
                  .catch((err) => {
                    console.log("Username", username); //already logged in
                    console.error(err); //already logged in
                  })
              }
            >
              <FaLongArrowAltRight />
            </Button>
          </Box>
        </Flex>
      </form>
      <Flex
        justifyContent={"center"}
        backgroundColor={"grey.200"}
        opacity={0.3}
        position={"relative"}
        py={4}
      >
        <Text position={"absolute"} left={72} fontSize={"2xl"} top={28}>
          Coming Soon
        </Text>
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
          <Image
            width={"100"}
            height="100"
            src="/hiveauth.ac85800f.svg"
            alt="3speak logo"
          />
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
      <Flex backgroundColor={"grey.200"} opacity={0.3} position={"relative"}>
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
          <Image
            width={"100"}
            height="100"
            src="/hivesigner.6958efa0.svg"
            alt="3speak logo"
          />
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
  );
};

const StyledList = styled.ul`
  padding-left: 0.5rem;
`;

const StyledButton = styled.button<{
  colors?: { init: string; hover: string; active: string };
}>`
  align-items: center;
  appearance: button;
  width: 100%;
  justify-content: center;
  background-color: ${({ colors }) => colors?.init ?? "#0276ff"};
  border-radius: 8px;
  border-style: none;
  box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  font-family: "RM Neue", sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  padding: 15px 21px;
  text-align: center;
  text-transform: none;
  transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
    opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    background-color: ${({ colors }) => colors?.active ?? "#006ae8"};
  }

  &:hover {
    background-color: ${({ colors }) => colors?.hover ?? "#1c84ff"};
  }
`;

export default SignInHive;
