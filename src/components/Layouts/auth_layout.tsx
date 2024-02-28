import { Box, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from 'next/router';

import React, { useState } from 'react'

const AuthLayout = ({ children }: any) => {
    const { pathname } = useRouter();
    const router = useRouter();
    const [currentAuthPage, setCurrentAuthPage] = useState<string>("tab1");

    const updateAuthCurrentPage = (tab: string) => {
        setCurrentAuthPage(tab);
        switch (tab) {
            case "tab1":
                router.push(`/auth/login`)
                break;
            case "tab2":
                router.push(`/auth/hive_signin`)
                break;
            case "tab4":
                router.push(`/auth/hive_signup`)
                break;

            case "tab3":
                router.push(`/auth/signup`)
                break;
            default:
                break;
        }

    };
    return (
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
                                Sign Up - Hive Referral
                            </Tabs.Trigger>
                        </Tabs.List>
                        {children}
                    </Tabs.Root>
                </Box>
            </main>
        </Flex>
    )
}

export default AuthLayout