import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Collapse, Flex, Link, Text } from "@chakra-ui/react";
import CommentFooter from "../CommentFooter";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { CommentInterface, VideoInterface } from "types";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "@/graphql/queries";
import CustomMarkdown from "@/helper/CustomMarkdown";
import Comments from "./Comment";
import CommentParenting from "./CommentParenting";
import { useAuth } from "@/hooks/auth";

type Props = {
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const isAuthenticated = useAuth();

const AllComments = ({ author, permlink, bgColor, colorMode }: Props) => {
  //call the comment query
  //TODO: .writeQuery {}
  const getComments = useQuery(GET_COMMENTS, {
    variables: { author, permlink },
  });

  const commentsData: CommentInterface[] =
    getComments?.data?.socialPost?.children;
  console.log("Comments", commentsData);

  const getAllReplies = (replies: CommentInterface[]): CommentInterface[] => {
    let allReplies: CommentInterface[] = [];
    replies.forEach((reply: CommentInterface) => {
      allReplies.push(reply);
      if (reply.children) {
        allReplies = [...allReplies, ...getAllReplies(reply.children)];
      }
    });
    return allReplies;
  };

  if (commentsData === undefined) {
    return <Box>Loading..</Box>;
  }
  console.log(isAuthenticated)
  return (
    <>
      <Box boxShadow={"bg"}>
        <Box
          style={{
            opacity: !isAuthenticated?.authenticated ? 0.05 : 1,
            pointerEvents: !isAuthenticated?.authenticated ? "none" : "auto",
          }}
          position={"relative"}
        >
          <Flex>
            <h2>Comments</h2>
          </Flex>
          <Box>
            <CommentParenting
              bgColor={bgColor}
              colorMode={colorMode}
              author={author}
              permlink={permlink}
            />
          </Box>
          <Box maxHeight={"2000px"} overflow="hidden" position={"relative"}>
            <Box padding={"5px"} paddingTop="25px" zIndex={2}>
              <Comments comments={commentsData} parentIndex={0} depth={0} />
            </Box>
          </Box>
        </Box>
        {!isAuthenticated?.authenticated && (
          <Box position={"absolute"} top={"30%"} left="35%" opacity={1}>
            <Link href="/auth/modals">
              <Button colorScheme={"blue"} py={3}>
                Sign in to see the comments!
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllComments;
