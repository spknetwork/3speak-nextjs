//TODO: work on this component for optimistic UI
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  Flex,
  Avatar,
  Box,
  Button,
  InputGroup,
  InputRightElement,
  Textarea,
  Text,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { MdCancel, MdOutlineGif } from "react-icons/md";
import { RiText } from "react-icons/ri";
import { createPortal } from "react-dom";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import { ProfileInterface } from "types";

type Props = {
  bgColor: string;
  colorMode: string;
  commentId: string;
};

const CommentFooter = (props: Props) => {
  const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;
  const [comment, setComment] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const [upvotes, setUpvotes] = useState<number>(1000);

  const ref = useRef<HTMLTextAreaElement>(null);
  const showComment = () => setComment(true);
  const hideComment = () => setComment(false);

  const toggleComment = () => {
     setComment(prev => !prev)
  }

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setDownvoted(false);
    if (!upvoted) {
      setUpvotes((prev) => prev + 1);
    }
    if (upvoted) {
      setUpvotes((prev) => prev - 1);
      setDownvoted(false);
    }
  };

  const handleDownvote = () => {
    setDownvoted(!downvoted);

    if (upvoted) {
      setUpvoted(false);
      setUpvotes((prev) => prev - 1);
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const emojiRef = useRef<HTMLDivElement>(null);
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });

  const resizeHandler = useCallback(() => {
    const emoji = emojiRef.current;
    if (!emoji) return;
    const boundingBox = emoji.getBoundingClientRect();
    setEmojiPosition({ x: boundingBox.left, y: boundingBox.top });
  }, []);

  const handleEmoji = () => {
    setShowEmoji((prevShowEmoji) => {
      if (prevShowEmoji) {
        window.removeEventListener("resize", resizeHandler);
        return false;
      } else {
        const emoji = emojiRef.current;
        if (!emoji) return false;
        const boundingBox = emoji.getBoundingClientRect();
        setEmojiPosition({ x: boundingBox.left, y: boundingBox.top });
        window.addEventListener("resize", resizeHandler);
        return true;
      }
    });
  };

  const handleCancel = () => {
    hideComment()
    if (ref.current) {
      ref.current.value = "";
    }
    setInputValue("");
  };

  return (
    <Box>
      <Box display={"flex"} alignItems="center" flexFlow={"row nowrap"}>
        <Flex alignItems={"center"}>
          <Box
            margin={"3px 4px 4px -4px"}
            padding="0"
            alignItems={"center"}
            display="flex"
            flexDirection={"row"}
          >
            <Box marginRight={"5px"}>
              <Flex
                marginLeft={"5px"}
                justifyContent={"center"}
                alignItems="center"
                color={props.colorMode === "dark" ? "white" : "black"}
                cursor="pointer"
                onClick={handleUpvote}
              >
                {upvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <Text
                  color={props.colorMode === "dark" ? "white" : "black"}
                  margin="4px"
                  marginBottom={"0px"}
                  width={"auto"}
                  lineHeight="15px"
                  textAlign={"center"}
                  fontSize="12px"
                  fontWeight={"700"}
                  pointerEvents="none"
                  wordBreak={"normal"}
                >
                  {upvotes}
                </Text>
              </Flex>
            </Box>

            <Flex
              marginLeft={"5px"}
              justifyContent={"center"}
              alignItems="center"
              color={props.colorMode === "dark" ? "white" : "black"}
              cursor="pointer"
              onClick={handleDownvote}
            >
              {downvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
              <Text marginBottom={"0px"} marginLeft={"5px"}>
                Dislike
              </Text>
            </Flex>
          </Box>

          <Box
            margin={"0px 0 0 5px"}
            alignItems={"center"}
            display="flex"
            flexDirection={"row"}
            fontSize="12px"
            fontWeight={"700"}
            lineHeight="16px"
          >
            <Box
              color={props.colorMode === "dark" ? "white" : "black"}
              marginLeft={"5px"}
            >
              <Flex
                cursor={"pointer"}
                onClick={toggleComment}
                justifyContent={"center"}
                alignItems="center"
              >
                <BiComment fontSize={"14px"} />
                <Text marginBottom={"0px"} marginLeft={"3px"}>
                  Reply
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      {comment && (
        <Flex
          bg={props.bgColor}
          py={2}
          px={2}
          borderRadius="md"
          position={"relative"}
          h={"120px"}
          w="95%"
          margin="auto"
        >
          <Box position={"absolute"} top={2} left={-10}>
            <Avatar src={getUserProfile?.images?.avatar} boxSize="2.5rem" />
          </Box>
          <InputGroup size="md">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={"Write a reply"}
              borderRadius={"10px"}
              pr="4rem"
              _focus={{ boxShadow: "none" }}
              resize="none"
              h={"110px"}
              ref={ref}
            />
            <Flex position={"absolute"} bottom={12} right={24}>
              <InputRightElement>
                <Flex>
                  <Button colorScheme="blue" ml={2}>
                    Comment
                  </Button>
                  <Button ml={2} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Flex>
              </InputRightElement>
            </Flex>
            <Flex position="absolute" zIndex={2} bottom={4} left={4} gap={4}>
              <Flex
                ref={emojiRef}
                fontSize={"20px"}
                onClick={handleEmoji}
                cursor="pointer"
                position="relative"
              >
                <BsEmojiSmile cursor="pointer" />
              </Flex>
              {showEmoji &&
                createPortal(
                  <Box
                    zIndex={99}
                    position="absolute"
                    top={450 + 120 + 162 + 240 + 200 + emojiPosition.y}
                    left={emojiPosition.x - 12}
                  >
                    <Button onClick={() => setShowEmoji(!showEmoji)}>
                      <MdCancel />
                    </Button>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </Box>,
                  document.body
                )}
              <Flex>
                <LuImagePlus fontSize={"20px"} />
              </Flex>
              <Flex>
                <MdOutlineGif fontSize={"20px"} />
              </Flex>
              <Flex>
                <RiText fontSize={"20px"} />
              </Flex>
            </Flex>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default CommentFooter;
