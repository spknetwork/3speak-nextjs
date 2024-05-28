//TODO: Fix the padding and the margin there
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CommunityTile } from "../components/widgets/CommunityTile";
const { Client: HiveClient } = require("@hiveio/dhive");
const client = new HiveClient("https://api.openhive.network");
import { useColorMode, useColorModeValue, Box, useBreakpointValue } from "@chakra-ui/react";
import MainLayout from "@/components/Layouts/main_layout";
import { Grid, Flex } from "@chakra-ui/react";

export default function CommunitiesView() {
  //for dark mode
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  const [data, setData] = useState([]);

  const generate = async () => {
    const res = await client.call("bridge", "list_communities", {
      last: "",
      limit: 100,
    });
    setData(res);
  };
  useEffect(() => {
    document.title = "3Speak - Tokenised video communities";
    generate();
  }, []);

  return (
    <MainLayout>
      <Box>
        <Box className="header_sec" background={bgColor}>
          <Box className="header_sec" background={bgColor}>
            <Box background={bgColor}>
              <Box className="col-lg-6 col-md-6 col-xs-12 header_dist1">
                <h1 className="white_col">COMMUNITIES</h1>
                <p  color={colorMode === "dark" ? "white" : "black"}>
                  Keep scrolling to explore more exciting communities!
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box background={bgColor} color={colorMode === "dark" ? "white" : "black"} mx={4}>
          <Row>
            <Box className="col-12 d-flex flex-row justify-content-end">
              <Box className="float-right mb-3">
                <Button
                  className="color-primary p-3"
                  id="communityCreate"
                  variant="primary"
                >
                  CREATE +
                </Button>
              </Box>
            </Box>

            <Box className="col-12">
              <Box className="alert alert-primary text-white" role="alert">
                Make sure you have a minimum of 3.00 HIVE in your HIVE wallet to
                create a new community
              </Box>
            </Box>
          </Row>
          <Flex wrap="wrap" justifyContent="space-between">
            {data.map((value: any) => (
              <CommunityTile
                bgColor={bgColor}
                colorMode={colorMode}
                key={value.name}
                name={value.name}
                sum_pending={value.sum_pending}
                reflink={`${value.name}`}
                info={value}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </MainLayout>
  );
}