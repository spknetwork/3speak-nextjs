import {
  Box,
  Flex,
  Text,
  Switch,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
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
      justifyContent={"flex-end"}
    >
      <nav>
          <Box
            position={"sticky"}
            top={0}
            height={["auto", "auto", "100vh"]}
          >
            <MiniSidebar />
          </Box>
            <Text position={"absolute"} right={[2, 6, 8, 12]} top={[1, 2, 3, 4]} fontSize={["xs", "sm", "md", "xl"]} zIndex={2}>
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
        flexDirection = {{ base: "column", md: "column", lg: "column"}}
      >
        <main>{children}</main>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default MainLayout;
