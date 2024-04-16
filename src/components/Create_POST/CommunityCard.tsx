import react from "react";
import {
  Flex,
  Card,
  CardHeader,
  Text,
  Heading,
  CardBody,
  Box,
} from "@chakra-ui/react";
import Image, { ImageLoader } from "next/image";
import { CommunityResult } from "../../pages/studio/create_post";
import { width } from "styled-system";


const CommunityCard: React.FC<Partial<CommunityResult>> = (info) => {

const myLoader: ImageLoader = ({width, quality}) => {
    return `https://images.hive.blog/u/${
      info.name
    }/avatar?size=icon&w=${width}&q=${quality || 75}`;
  };

  return (
    <Card
      w={["full", "base"]}
      h={"99%"}
      top={2}
      mx={4}
      overflowWrap="break-word"
    >
      <Flex
        p={4}
        direction={["column", "row"]}
        align="center"
        borderRadius={"10px"}
      >
        <Image
          alt="hive blog"
          width="120px"
          height="120px"
          loader={myLoader}
          src={myLoader({
              width: 120, quality: 75,
              src: ""
          })}
        />
        <Box mx={[0, 4]} mt={[2, 0]}>
          <Heading size="md">
            <Text fontSize={[12, 18, 36, 48]}>{info.title}</Text>
            <Text>{info.about}</Text>
          </Heading>
        </Box>
      </Flex>
      <Flex>
        <Flex px={4} py={2} mx={4}>
          <Flex>
            <Text mx={1}>Admins:</Text>
            <Text fontWeight={"bold"}>{info.admins}</Text>
          </Flex>
        </Flex>
        <Flex px={4} py={2} mx={4}>
          <Flex>
            <Text mx={1}>Subscribers:</Text>
            <Text fontWeight={"bold"}>{info.subscribers}</Text>
          </Flex>
        </Flex>
        <Flex px={4} py={2} mx={4}>
          <Flex>
            <Text mx={1}>Sum Pending:</Text>
            <Text fontWeight={"bold"}>{info.sum_pending}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex m={5}>
        <Flex px={4} py={2}>
          <Flex>
            <Text mx={1}>Num Pending:</Text>
            <Text fontWeight={"bold"}>{info.num_pending}</Text>
          </Flex>
        </Flex>
        <Flex px={4} py={2} mx={4}>
          <Flex>
            <Text mx={1}>Num Authors:</Text>
            <Text fontWeight={"bold"}>{info.num_authors}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CommunityCard;
