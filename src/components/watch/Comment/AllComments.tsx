import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
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


const AllComments = ({ author, permlink, bgColor, colorMode }: Props) => {
    
    const isAuthenticated = useAuth();
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
    replies?.forEach((reply: CommentInterface) => {
      allReplies.push(reply);
      if (reply.children) {
          allReplies = [...allReplies, ...getAllReplies(reply.children)];
      }
    });
    return allReplies;
  };

  console.log("These are the all replie", getAllReplies(commentsData))

  
  if (commentsData === undefined) {
      return <Box>Loading..</Box>;
    }
    console.log(isAuthenticated);
    
    return (
        <Box>
      <Flex fontFamily={"system-ui"}>
        <h3>Comments</h3>
      </Flex>
      <Box>
        <CommentParenting
          bgColor={bgColor}
          colorMode={colorMode}
          author={author}
          permlink={permlink}
        />
      </Box>
      <Box overflow="hidden" position={"relative"} height={"auto"}>
        <Box padding={"5px"} paddingTop="25px" zIndex={2}>
          <Comments
            comments={commentsData}
            parentIndex={0}
            depth={0}
            author={author}
            permlink={permlink}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AllComments;
