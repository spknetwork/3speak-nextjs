import "../styles/globals.scss";

import "../styles/styles.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { useRouter } from "next/router";
import { Sidebar } from "src/components";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.css";

import { useAppStore } from '../lib/store'

import { Box, ChakraProvider, Flex, Image, Link, Text } from "@chakra-ui/react";
import { BiEnvelope, BiGlobe } from "react-icons/bi";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { css } from "@emotion/react";
import { useEffect } from "react";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isAuth = pathname.includes("/auth");
  const isStudio = pathname.includes("/studio");

  const { checkAuth } = useAppStore()

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Provider store={store}>
      <Flex
        css={css`
          @media (max-width: 768px) {
            flex-direction: column;
          }

          @media (min-width: 769px) {
            flex-direction: row;
          }
        `}
      >
        <nav>
          <Box>{!isAuth && !isStudio && <Sidebar />}</Box>
        </nav>
        <Flex
          width={"100%"}
          css={css`
            @media (max-width: 768px) {
              flex-direction: column;
            }

            @media (min-width: 769px) {
              flex-direction: column;
            }
          `}
        >
          <main>
            <Box width={"100%"} backgroundColor="#EFF4F6">
              <ChakraProvider>
                <ApolloProvider client={client}>
                  <Component {...pageProps} />
                </ApolloProvider>
              </ChakraProvider>
              {/* <Box
            position={"absolute"}
            bottom="20px"
            width={"-webkit-fill-available"}
            border="1px solid"
            height={"100px"}
          >
            footer here
          </Box> */}
            </Box>
          </main>
          {!isAuth && (
            <Box
            backgroundColor={"#e8e8e8"}
            padding="5px"
            marginBottom={'10px'}
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
              {/* flex={"0 0 25%"} maxWidth={"25%"} paddingX="20px" */}
              <Flex width={"100%"} flexWrap='wrap'>
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
                    src="/images/3S_logo.svg"
                    alt="3speak logo"
                    width={200}
                    height={100}
                  />
                  <Link href="#">
                    <Flex alignItems={"center"}>
                      <BiEnvelope color="black" />
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
                <Box css={css`
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
                `}>
                  <Text fontWeight={"bold"} margin={"0px"} marginBottom="20px">
                    Company
                  </Text>
                  <Link href="#">
                    <Text fontWeight={"500"} margin={"0px"}>
                      About us
                    </Text>
                  </Link>
                  <Link href="#">
                    <Text fontWeight={"500"} margin={"0px"}>
                      FAQ
                    </Text>
                  </Link>
                  <Link href="#">
                    <Text fontWeight={"500"} margin={"0px"}>
                      Terms
                    </Text>
                  </Link>
                </Box>
                <Box css={css`
                  @media (max-width: 768px) {
                    flex: 0 0 44%;
                    max-width: 44%;
                    padding: 0px 20px;
                    padding-top:5px;
                  }
      
                  @media (min-width: 769px) {
                    flex: 0 0 25%;
                    max-width: 25%;
                    padding: 0px 20px;
                   
                  }
                `}>
                  <Text fontWeight={"bold"} margin={"0px"} marginBottom="20px">
                    Accepted Payment Methods
                  </Text>
                  <Image
                    src="/images/hive-blockchain-hive-logo.svg"
                    alt="3speak logo"
                    width={200}
                    height={100}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
          )}
          
        </Flex>
      </Flex>
    </Provider>
  );
}


export default MyApp;
