import React from "react";
import {
  CardBody,
  Box,
  Flex,
  Card,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import { SearchIcon } from "@chakra-ui/icons";
import CommunityCard from "@/components/Create_POST/CommunityCard";
import {CommunityResult} from "@/pages/studio/create_post"
import CommunityChip from "@/components/Create_POST/CommunityChip";

type Props = {
    cardData: CommunityResult | undefined;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    communityData: CommunityResult[];
    savingDetails: Boolean | null;
    handleStep2Complete: () => void;
    setSteps: React.Dispatch<React.SetStateAction<number>>;
    setCardData: React.Dispatch<React.SetStateAction<CommunityResult | undefined>>
    search: string;
};

const AddCommunity = ({cardData, setSearch, communityData, savingDetails, handleStep2Complete, setSteps, setCardData, search}: Props) => {

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  
  return (
    <CardBody maxH={"75vh"}>
      <Box height={{ base: "auto", md: "auto", lg: "70vh" }} width={"100%"}>
        <Flex w={"full"}>
          <Flex w={"50%"}>
            <CommunityCard {...cardData} />
          </Flex>
          <Flex w={"50%"} flexDirection={"column"}>
            {/* the result card will go here  */}
            <Flex>
              <Card w="full" m={2} h={"60vh"}>
                <Flex p={2}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
                <VStack spacing={1} overflowY={"auto"}>
                  {communityData
                    .filter((item: any) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.title
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map((item: any, index) => (
                      <CommunityChip
                        key={index}
                        item={item}
                        colorMode={colorMode}
                        setCardData={setCardData}
                      />
                    ))}
                </VStack>
              </Card>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          py={8}
          px={4}
        >
          <Button
            disabled={savingDetails == true ? true : false}
            onClick={() => setSteps(1)}
            size={"lg"}
            colorScheme="twitter"
          >
            <IoCaretBackSharp />
            Go Back
          </Button>
          <Button
            disabled={savingDetails == true ? true : false}
            onClick={handleStep2Complete}
            size={"lg"}
            colorScheme="twitter"
          >
            Next
            <IoCaretForwardSharp />
          </Button>
        </Flex>
      </Box>
    </CardBody>
  );
};

export default AddCommunity;
