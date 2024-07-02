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

import { CommentInterface, VideoInterface } from "types";
import { useAuth } from "@/hooks/auth";
import { useGetComments } from "@/hooks/getComments";
import SingleComment from "./SingleComment";
type Props = {
  parentIndex?: number;
  depth?: number
  author: string;
  permlink: string;
  bgColor: string;
  colorMode: string;
};

const AllComments = ({ author, permlink, bgColor, colorMode, parentIndex, depth }: Props) => {
  const isAuthenticated = useAuth();
  const commentsData = useGetComments(author, permlink);

  const getAllReplies = (
    replies: CommentInterface[] | undefined
  ): CommentInterface[] => {
    let allReplies: CommentInterface[] = [];
    replies?.forEach((reply: CommentInterface) => {
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
  console.log(isAuthenticated);

  return (
    <Box>
      <Box overflow="hidden" position={"relative"} height={"auto"}>
        <Box  paddingTop="12px" zIndex={2}>
    {commentsData?.map((comment: CommentInterface) => (
        <SingleComment
          key={comment.permlink}
          comment={comment}
          parentIndex={parentIndex || 0}
          depth={depth || 0}
          defaultIsCollapsed={false}
          author={author}
          permlink={permlink}
        />
      ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AllComments;
