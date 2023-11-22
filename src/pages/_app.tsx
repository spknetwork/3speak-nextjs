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
import { Avatar, Box, Button, ChakraProvider, Flex, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { BiEnvelope, BiGlobe } from "react-icons/bi";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import AccountsList from "@/components/Modal/AccountsList";
config.autoAddCss = false;

const FOOTER_TITLE = [
  { name: 'About us' },
  { name: 'FAQ' },
  { name: 'Terms' },
]

function MyApp({ Component, pageProps }: AppProps) {
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1 } = useDisclosure()
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pathname } = useRouter();
  const router = useRouter();
  const isAuth = pathname.includes("/auth");
  const isOtp = pathname.includes("/otp");
  const isStudio = pathname.includes("/studio");
  const [currentAuthPage, setCurrentAuthPage] = useState<string>("tab1");
  const { checkAuth, allowAccess, getUserDetails, setAccounts, listAccounts } = useAppStore();

  const addAccounts = () => {
    console.log('addAccounts')
    // show modal list of accounts available
    onCloseModal1()
    onOpenModal2()


  }
  const updateAuthCurrentPage = (tab: string) => {
    setCurrentAuthPage(tab);
    switch (tab) {
      case "tab1":
        router.push(`/auth/login`)
        break;
      case "tab2":
        router.push(`/auth/hive_signin`)
        break;

      case "tab3":
        window.location.href = "/auth/signup"
        // router.push(`/auth/signup`)
        break;
      default:
        break;
    }

  };

  useEffect(() => {
    if (allowAccess == true) {
      getUserDetails()
    }
  }, [allowAccess]);
  useEffect(() => {
    checkAuth();
    setAccounts()
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
          <Box>{!isAuth && !isStudio && !isOtp && <ChakraProvider><Sidebar /></ChakraProvider>}</Box>
        </nav>
        {isOtp && (
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

                  <ChakraProvider>
                    <ApolloProvider client={client}>
                      <Component tab={currentAuthPage} {...pageProps} />
                    </ApolloProvider>
                  </ChakraProvider>
                </Box>
              </main>
            </Flex>
          </>
        )}
        {isAuth && (
          <>
            <Flex
              margin='auto'
              marginTop='30px'
              css={css`
                @media (max-width: 820px) {
                  flex-direction: column;
                  width:100%;
                }

                @media (min-width: 821px) {
                  flex-direction: column;
                  width:35%;
                }
              `}
            >
              <main>
                <Box width={"100%"} backgroundColor="#EFF4F6" boxShadow={'10px 10px 5px lightblue'}>
                  <Tabs.Root className="TabsRoot" defaultValue={router.pathname == '/auth/signup' ? "tab3" : router.pathname == '/auth/hive_signin' ? 'tab2' : 'tab1'}>
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
                        Sign In with Hive
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        onClick={() => updateAuthCurrentPage("tab3")}
                        className="TabsTrigger"
                        value="tab3"
                      >
                        Sign Up
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        onClick={() => updateAuthCurrentPage("tab4")}
                        className="TabsTrigger"
                        value="tab4"
                      >
                        Hive Sign Up
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

        {!isAuth && !isOtp && (
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
                    <AccountsList isOpenModal1={isOpenModal1} onCloseModal1={onCloseModal1} listAccounts={listAccounts} addAccounts={addAccounts}/>
                    <ApolloProvider client={client}>
                      <Component {...pageProps} />
                    </ApolloProvider>
                  </ChakraProvider>

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
                        {FOOTER_TITLE.map((footer:any, index:number) => {
                          return (
                            <Link key={index} href="#">
                              <Text fontWeight={"500"} margin={"0px"}>
                                {footer.name}
                              </Text>
                            </Link>
                          )
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
