import react from "react";
import {
  Flex,
  Card,
  CardHeader,
  Text,
  Heading,
  Image,
  CardBody,
  Box,
} from "@chakra-ui/react";
 import {CommunityResult} from "../../pages/studio/create_post"

// type Concrete = {someKey: string}
// type Loose = Partial<Concrete>
// type AnotherLoose = {someKey?: string | undefined}

// const c: Concrete = {someKey: 'hi'}
// const a: Loose = c
// const b: Loose = {}
// const c1: AnotherLoose = a
// const d: AnotherLoose = b
// if (b.someKey !== undefined) {
// const e: Concrete = b
// }

const CommunityCard: React.FC<Partial<CommunityResult>> = (info) => {
  return (
    <Card w={["full", "base"]} h={"93%"} top={12}  mx={4} overflowWrap="break-word">
      <Flex p={4} direction={["column", "row"]} align="center">
        <Image
          borderRadius={"10px"}
          alt="hive blog"
          width={["40px", "60px", "90px", "120px"]}
          height={["40px", "60px", "90px", "120px"]}
          loader={() =>
            "https://images.hive.blog/u/" + info.name + "/avatar?size=icon"
          }
          src={"https://images.hive.blog/u/" + info.name + "/avatar?size=icon"}
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
