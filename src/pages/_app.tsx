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

import { useAppStore } from "../lib/store";
import * as Tabs from "@radix-ui/react-tabs";
import { Box, ChakraProvider, Flex, Image, Link, Text } from "@chakra-ui/react";
import { BiEnvelope, BiGlobe } from "react-icons/bi";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const router = useRouter();
  const isAuth = pathname.includes("/auth");
  const isStudio = pathname.includes("/studio");
  const [currentAuthPage, setCurrentAuthPage] = useState<string>("tab1");
  const { checkAuth } = useAppStore();

  const updateAuthCurrentPage = (tab: string) => {
    setCurrentAuthPage(tab);
    switch (tab) {
      case "tab1":
        router.push(`/auth/login`)
        break;
      case "tab2":
        router.push(`/auth/hive_signup`)
      break;

      case "tab3":
        router.push(`/auth/signup`)
      break;
      default:
        break;
    }
   
  };

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

        {isAuth && (
          <>
            <Flex
              margin='auto'
              marginTop='30px'
              width={"40%"}
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
                  <Tabs.Root className="TabsRoot" defaultValue="tab1">
                    <Tabs.List
                      className="TabsList"
                      aria-label="Manage your account"
                    >
                      <Tabs.Trigger
                        onClick={() => updateAuthCurrentPage("tab1")}
                        className="TabsTrigger"
                        value="tab1"
                      >
                        Sign In
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        onClick={() => updateAuthCurrentPage("tab2")}
                        className="TabsTrigger text-center"
                        value="tab2"
                      >
                        Sign Up with Hive
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        onClick={() => updateAuthCurrentPage("tab3")}
                        className="TabsTrigger"
                        value="tab3"
                      >
                        Sign Up
                      </Tabs.Trigger>
                    </Tabs.List>
                    <ChakraProvider>
                      <ApolloProvider client={client}>
                        <Component tab={currentAuthPage} {...pageProps} />
                      </ApolloProvider>
                    </ChakraProvider>
                  </Tabs.Root>
                </Box>
              </main>
            </Flex>
          </>
        )}

        {!isAuth && (
          <>
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
                    {/* flex={"0 0 25%"} maxWidth={"25%"} paddingX="20px" */}
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
                        <Text
                          fontWeight={"bold"}
                          margin={"0px"}
                          marginBottom="20px"
                        >
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
                        <Text
                          fontWeight={"bold"}
                          margin={"0px"}
                          marginBottom="20px"
                        >
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
          </>
        )}
      </Flex>
    </Provider>
  );
}

export default MyApp;
