import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Flex,
  Text,
  CardHeader,
  CardBody,
  Heading,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"; 
import { News } from "@/lib/slices/createStudioSlice";
import { useAppStore } from "@/lib/store";

type Props = {};

const NewsComponent = (props: Props) => {
  const [mNews, setMNews] = useState<News[]>([]);

  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const { news, video_count, followers_count, views_count } = useAppStore();
  

  useEffect(() => {
    setMNews(news);
  }, [news])

  return (
    <Box>
      <Card>
        <CardHeader
          padding={"0.75rem 1.25rem"}
          bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
          borderBottom={"1px solid #e3e6f0"}
          paddingTop="1rem !important"
          paddingBottom={"1rem !important"}
          borderRadius="calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0"
        >
          <Heading
            size="md"
            color={"#4e73df !important"}
            fontWeight="700 !important"
            fontSize={"1.2rem"}
            lineHeight="1.2"
          >
            News
          </Heading>
        </CardHeader>

        <CardBody
          flex={"1 1 auto"}
          padding="1.25rem"
          bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
        >
          {mNews?.map((news, index) => (
            <Box key={index}>
              <Card
                key={index}
                marginTop={"4%"}
                position="relative"
                wordBreak="break-word"
                backgroundClip={"border-box"}
                border="1px solid #e3e6f0"
                borderRadius={"0.35rem"}
                bgColor={colorMode === "dark" ? "#222731" : "gray.50"}
              >
                <CardBody display={"flex"} flexDirection={"column"}>
                  <Link
                    color={"#4e73df"}
                    textDecoration="none"
                    backgroundColor={"transparent"}
                  >
                    <Text
                      as={"h4"}
                      marginBottom="0.5rem"
                      fontWeight={"400"}
                      lineHeight="1.2"
                      fontSize={"1.5rem"}
                    >
                      {news.title}
                    </Text>
                  </Link>
                  <Text textAlign={"left"} fontSize={"md"}>
                    {news.description}
                  </Text>
                </CardBody>
              </Card>
            </Box>
          ))}
        </CardBody>
      </Card>
    </Box>
  );
};

export default NewsComponent;
