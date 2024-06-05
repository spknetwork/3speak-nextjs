import React from 'react'
import {Box, Flex, Text, Avatar} from "@chakra-ui/react"
import { CommentInterface } from 'types';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import SingleComment from './SingleComment';

type Props = {}

const Comments = ({
  comments,
  parentIndex,
  depth = 1,
}: {
  comments: CommentInterface[];
  parentIndex: number;
  depth?: number;
}) => {
  return (
    <>
      {comments.map((comment: CommentInterface) => (
        <SingleComment
          key={comment.permlink}
          comment={comment}
          parentIndex={parentIndex}
          depth={depth}
          defaultIsCollapsed={false}
        />
      ))}
    </>
  );
};

export default Comments;