import { Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/router";

import React, { useState } from "react";

type Props = {
  currentAuthPage: string;
  setCurrentAuthPage: (value: string) => void;
};

const ParentComponent = (props: Props) => {
  //function for making the conditional rendering the components
  const updateAuthCurrentPage = (tab: string) => {
    // setCurrentAuthPage(tab);
    switch (tab) {
      case "tab1":
        props.setCurrentAuthPage("tab1");
        break;
      case "tab2":
        props.setCurrentAuthPage("tab2");
        break;
      case "tab4":
        props.setCurrentAuthPage("tab4");
        break;
      case "tab3":
        props.setCurrentAuthPage("tab3");
        break;
      default:
        break;
    }
  };

  return (
    <Flex
      margin="auto"
      paddingTop={"30px"}
      css={css`
        @media (max-width: 820px) {
          flex-direction: column;
          width: 100%;
        }

        @media (min-width: 821px) {
          flex-direction: column;
          width: 35%;
        }
      `}
    >
      <main>
        <Box
          width={"100%"}
          boxShadow={"5px 0px 5px lightblue"}
          borderTopLeftRadius={"10px"}
          borderTopRightRadius={"10px"}
        >
          <Tabs.Root className="TabsRoot">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger
                onClick={() => updateAuthCurrentPage("tab1")}
                className="TabsTrigger"
                value="tab1"
              >
                <Text fontSize={["12px", "16px", "8px", "12px"]}>Sign In</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={() => updateAuthCurrentPage("tab2")}
                className="TabsTrigger text-center"
                value="tab2"
              >
                <Text fontSize={["12px", "16px", "8px", "12px"]}>
                  Sign In with Hive
                </Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={() => updateAuthCurrentPage("tab3")}
                className="TabsTrigger"
                value="tab3"
              >
                <Text fontSize={["12px", "16px", "8px", "12px"]}>Sign Up</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={() => updateAuthCurrentPage("tab4")}
                className="TabsTrigger"
                value="tab4"
              >
                <Text fontSize={["12px", "16px", "8px", "12px"]}>
                  Sign Up - Hive Referral
                </Text>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Box>
      </main>
    </Flex>
  );
};

export default ParentComponent;
