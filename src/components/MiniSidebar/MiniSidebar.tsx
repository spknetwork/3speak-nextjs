import React from "react";
import { Flex, VStack, Text, Image, useColorModeValue, useColorMode} from "@chakra-ui/react";
import Link from "next/link";
//TODO: add a bg shade in the dark mode
//importing the data
import { MiniNavigationData } from "../../components/data/NavigationData";
import { bgcolor } from "@mui/system";

type Props = {};

const MiniSidebar = (props: Props) => {


    const bgColor = useColorModeValue("gray.100", "gray.800");
    const { colorMode, toggleColorMode } = useColorMode();


  return (
    <Flex
      justifyContent={"center"}
      h={96}
      w={16}
      position={"absolute"}
      left={0}
      top={64}
      backgroundColor={colorMode === "dark" ? "gray.300" : "gray.500"}
      borderRadius={"xl"}
    >
      <VStack spacing={4} m={2}>
        {MiniNavigationData.map((item, index) => (
          <Text key={index}>
            <Text></Text>
            <Link href={`${item.route}`}>
              <Image src={item.img} alt={"icon"} cursor={"pointer"} />
            </Link>
          </Text>
        ))}
      </VStack>
    </Flex>
  );
};

export default MiniSidebar;
