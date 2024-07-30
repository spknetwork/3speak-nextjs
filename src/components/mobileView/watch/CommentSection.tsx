//TODO: to all the 
import React, { useState, useRef,  } from "react";
import { useGetComments } from "@/hooks/getComments";
import { CommentInterface } from "types";
import {
  Card,
  CardBody,
  Flex,
  Box,
  Avatar,
  Text,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import CustomMarkdown from "@/helper/CustomMarkdown";
import AllComments from "@/components/watch/Comment/AllComments";
import CommentParenting from "@/components/watch/Comment/CommentParenting";


type Props = {
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const CommentSection = (props: Props) => {
  const commentsData = useGetComments(props.author, props.permlink);
  console.log("Comments Data", commentsData);

  //function for calculating the time
  function timeAgo(date: string): string {
    const now = new Date();

    const nowDate = new Date(date);
    const ago = now.getTime() - nowDate.getTime();

    const seconds = Math.floor(ago / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      return `Other time unit ago`;
    }
  }

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const toggleComments = () => {
    setShowAllComments((prev) => !prev);
  };

  if (!showAllComments) {
    return (
      <>
        <Card
          onClick={onOpen}
          ref={btnRef}
          cursor={"pointer"}
          bg={props.colorMode === "light" ? "gray.200" : "gray.750"}
          borderRadius={"2xl"}
        >
          <CardBody>
            {commentsData
              ?.slice(0, 1)
              .map((comment: CommentInterface, index) => (
                <Box key={index}>
                  <Flex alignItems={"center"}>
                    <Box
                      alignSelf={"flex-start"}
                      border={
                        props.colorMode == "dark"
                          ? "1px solid white"
                          : "1px solid black"
                      }
                      borderRadius={"50%"}
                      zIndex={2}
                    >
                      <Avatar
                        name={comment.author?.profile?.name}
                        src={comment?.author?.profile?.images?.avatar}
                      />
                    </Box>
                    <Flex px={2} gap={1} alignItems={"center"} mt={2}>
                      <Text fontWeight={"bold"} fontSize={"md"}>
                        {comment?.author?.profile?.name}
                      </Text>
                      <Text fontSize={["12px"]}>{`@${comment?.author?.username}`}</Text>
                      <Flex alignItems={"center"} mb={2}>
                        <BsDot />
                      </Flex>
                      <Text fontSize={"10px"}>{timeAgo(comment?.created_at)}</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Box
                      padding={"0px 50px"}
                      width="100%"
                      color={props.colorMode === "dark" ? "white" : "black"}
                    >
                      <CustomMarkdown content={comment?.body.slice(0, 90)} />
                    </Box>
                  </Flex>
                </Box>
              ))}
          </CardBody>
        </Card>
        <Drawer
          isOpen={isOpen}
          placement="bottom"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerContent h="70vh">
            <Button zIndex={12}>
            <DrawerCloseButton />
            </Button>
            <DrawerBody>
             <CommentParenting 
              author={props.author}
              permlink={props.permlink}
              bgColor={props.bgColor}
              colorMode={props.colorMode}
             />
              <AllComments
                author={props.author}
                permlink={props.permlink}
                bgColor={props.bgColor}
                colorMode={props.colorMode}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
};
export default CommentSection;
