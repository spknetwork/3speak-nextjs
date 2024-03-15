import {
  Box,
  Flex,
  Text,
  Switch,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import Footer from "../footer/Footer";
import MiniSidebar from "../MiniSidebar/MiniSidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const MainLayout = ({ children }: any) => {
  //for the dark mode
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      css={css`
        @media (max-width: 768px) {
          flex-direction: column;
        }

        @media (min-width: 769px) {
          flex-direction: row;
        }
      `}
      justifyContent={"flex-end"}
    >
      <nav>
          <Box
            position={["sticky", "sticky", "sticky"]}
            top={0}
            left={0}
            height={["auto", "auto", "100vh"]}
          >
            <MiniSidebar />
          </Box>
            <Text position={"absolute"} right={[2, 6, 8, 12]} top={[1, 2, 3, 4]} fontSize={["xs", "sm", "md", "xl"]}>
              <Switch
                // size={["sm", "sm", "md", "4xl"]}
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />{" "}
              {colorMode === "dark" && <MoonIcon />}{" "}
              {colorMode !== "dark" && <SunIcon />}
            </Text>
      </nav>
      <Flex
        width={"97%"}
        css={css`
          @media (max-width: 768px) {
            flex-direction: column;
          }

          @media (min-width: 769px) {
            flex-direction: column;
          }
        `}
      >
        <main>{children}</main>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
