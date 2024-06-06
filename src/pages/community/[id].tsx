//TODO: fix this page
import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITIES } from "../../graphql/queries";
import ErrorComponent from "@/components/ErrorComponent";
import MainLayout from "@/components/Layouts/main_layout";
import { bgcolor } from "@mui/system";
import FeedGrid from "@/components/feedgrid/FeedGrid";

const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic ID from the query object
  const { loading, error, data } = useQuery(GET_COMMUNITIES, {
    variables: { id: id },
  });

  const [showFeed, setShowFeed] = useState<number>(1);

  const showFeedById = (number: number) => {
    setShowFeed(number);
  };

  //   for dark mode stuff
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  if (loading) {
    return (
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
        height={"100%"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text
          as={"h1"}
          fontSize="39px"
          textTransform={"uppercase"}
          lineHeight="38px"
        >
          Getting Details...
        </Text>
      </Box>
    );
  }

  if (error) return <ErrorComponent errorMsg={error.toString()} />;
  const { community } = data;

  console.log("community", community)

  const trendingFeed = data.community.trendingFeed.items;
  const latestFeed = data.community.latestFeed.items;

  return (
    <MainLayout>
      <Box position={"relative"} width="100%" minHeight={"400px"}>
        <Flex
          w={"full"}
          h={"32vh"}
          backgroundImage={`url("https://media.3speak.tv/user/${id}/cover.png")`}
          backgroundSize={"cover"}
          backgroundRepeat={"repeat"}
          backgroundPosition="center"
        ></Flex>
        <Image
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "#fff none repeat scroll 0 0",
            border: "2px solid #fff",
            borderRadius: "50px",
          }}
          src={`https://images.hive.blog/u/${id}/avatar`}
          width="90px"
          height="90px"
          alt="Picture of the author"
        />
        <Text
          as={"h1"}
          position={"absolute"}
          bottom="10px"
          left={"150px"}
          fontSize="39px"
          textTransform={"uppercase"}
          lineHeight="38px"
        >
          <Text
            fontWeight={"bolder"}
            color="white"
            textShadow={
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            }
            as={"b"}
          >
            {community.title}
          </Text>
        </Text>
      </Box>
      <Box padding={"15px"}>
        <div className="container-fluid">
          <Text
            as={"h4"}
            marginTop="1rem"
            marginBottom={"0.5rem"}
            fontWeight="500"
            lineHeight={"1.2"}
            fontSize="1.21875rem"
          >
            {community?.about}
          </Text>
          <Text as={"p"} margin="0 0 1em">
            Using our Hive-based token (LEO) we reward content creators and
            users for engaging on our platform at https://leofinance.io and
            within our community on the Hive blockchain. Blogging is just the
            beginning of what`s possible in the LeoFinance community and with
            the LEO token: 1). Trade LEO and other Hive-based tokens on our
            exchange: https://leodex.io 2). Track your Hive account statistics
            at https://hivestats.io 3). Opt-in to ads on LEO Apps which drives
            value back into the LEO token economy from ad buybacks. 4). Learn &
            contribute to our crypto-educational resource at https://leopedia.io
            5). Wrap LEO onto the Ethereum blockchain with our cross-chain token
            bridge: https://wleo.io (coming soon) Learn more about us at
            https://leopedia.io/faq
          </Text>
          <Divider
            marginTop={"1rem"}
            marginBottom="1rem"
            border={"0"}
            borderTop={colorMode === "dark" ? `1px solid black` : "1px solid grey"} 
          />
          <ul className="nav nav-tab" id="nav-tab" role={"tablist"}>
            <li className="nav-item">
              <a
                className="nav-link active"
                color={colorMode === "dark" ? "white" : "black"}
                data-toggle="tab"
                href="#videos"
                role="tab"
              >
                Videos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#polls"
                role="tab"
                color={colorMode === "dark" ? "white" : "black"}
              >
                Polls
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#stats"
                role="tab"
                color={colorMode === "dark" ? "white" : "black"}
              >
                Stats
              </a>
            </li>
          </ul>
          <Divider
            marginTop={"1.5rem"}
            marginBottom="1.5rem"
            border={"0"}
            borderTop="1px solid rgba(0,0,0,0.1)"
          />
          <ButtonGroup
            boxShadow={"1px 1px 4px rgba(0,0,0,0.4)"}
            borderRadius="6px"
            variant="outline"
            isAttached
            spacing="0"
          >
            {/* boxShadow={"0 1px 4px rgba(0,0,0,0.4)"} */}
            <Button
              size="lg"
              className="active"
              onClick={() => showFeedById(1)}
            >
              TRENDING
            </Button>
            {/* boxShadow={"1px 1px 4px rgba(0,0,0,0.4)"} */}
            <Button size="lg" onClick={() => showFeedById(2)}>
              NEW
            </Button>
          </ButtonGroup>
          <Divider
            marginTop={"1.5rem"}
            marginBottom="1.5rem"
            border={"0"}
            borderTop="1px solid rgba(0,0,0,0.1)"
          />
          <Text
            as={"h3"}
            marginTop="1rem"
            marginBottom={"0.5rem"}
            fontWeight="500"
            lineHeight={"1.2"}
            fontSize="1.421875rem"
          >
            {showFeed == 1 && <Text>Trending Video</Text>}
            {showFeed == 2 && <Text>New Video</Text>}
          </Text>
          <Box>
            <Box className="row">
              {showFeed == 1 && (
                <FeedGrid
                  videos={trendingFeed}
                  bgColor={bgColor}
                  colorMode={colorMode}
                />
              )}
              {showFeed == 2 && (
                <FeedGrid
                  videos={latestFeed}
                  bgColor={bgColor}
                  colorMode={colorMode}
                />
              )}
            </Box>
          </Box>
        </div>
      </Box>
    </MainLayout>
  );
};

export default CommunityDetails;
