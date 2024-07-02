//TODO:

import React, { useCallback, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import {
  Flex,
  Box,
  Text,
  Textarea,
  Avatar,
  InputGroup,
  Button,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import { ProfileInterface } from "types";
import { BsEmojiSmile } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineGif } from "react-icons/md";
import { RiText } from "react-icons/ri";
import { createPortal } from "react-dom";
import { handleAddComment} from "@/query/AddComment"
import { useAuth } from "@/hooks/auth";
import {useRouter} from "next/router" 


type Props = {
  bgColor: string;
  colorMode: string;
  author: string;
  permlink: string;
};

const CommentParenting = (props: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { authenticated } = useAuth();

  const onEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    if (ref.current) {
      ref.current.value = "";
    }
    setInputValue("");
  };

  const emojiRef = useRef<HTMLDivElement>(null);
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });
  const resizeHandler = useCallback((e: UIEvent) => {
    console.log("resize", e);
    const emoji = emojiRef.current;
    if (!emoji) {
      console.log("no emoji?");
      return;
    }
    const boundingBox = emoji.getBoundingClientRect();
    setEmojiPosition({ x: boundingBox.left, y: boundingBox.top });
  }, []);

  const handleEmoji = () => {
    setShowEmoji((showEmoji) => {
      if (showEmoji) {
        window.removeEventListener("resize", resizeHandler);
        return false;
      } else {
        const emoji = emojiRef.current;
        if (!emoji) {
          return false;
        }
        const boundingBox = emoji.getBoundingClientRect();
        setEmojiPosition({ x: boundingBox.left, y: boundingBox.top });
        window.addEventListener("resize", resizeHandler);
        return true;
      }
    });
  };

  //function for handling the add comments
  async function handleAddCommentFunc() {
    handleAddComment(props.author, props.permlink, inputValue);
    setInputValue("");
    setIsExpanded(false);   
  }

  if(!authenticated){
    return (
        <Alert status='error'>
        <AlertIcon />
        <AlertTitle>You need to login before you comment!</AlertTitle>
      </Alert>
    )
  }

    return (
      <Flex
        bg={props.bgColor}
        py={2}
        px={2}
        borderRadius="md"
        position={"relative"}
        w="95%"
        margin="auto"
      >
        <Box position={"absolute"} top={2} left={-10}>
          <Avatar src={authenticated ? getUserProfile?.images?.avatar : "/images/avatar3.png"} boxSize="2.5rem" />
        </Box>
        <InputGroup size="md">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isExpanded ? "" : "Write a comment"}
            borderRadius={isExpanded ? "10px" : "full"}
            pr="4rem"
            _focus={{ boxShadow: "none" }}
            onClick={handleInputClick}
            minH={isExpanded ? "120px" : "auto"}
            maxH={isExpanded ? "320px" : "auto"}
            resize="none"
            overflow={"hidden"}
            ref={ref}
          />
          <Flex position={"absolute"} bottom={12} right={24}>
            <InputRightElement>
              {" "}
              {isExpanded && (
                <Flex>
                  <Button
                    colorScheme="blue"
                    ml={2}
                    onClick={handleAddCommentFunc}
                  >
                    Comment
                  </Button>
                  <Button ml={2} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Flex>
              )}
            </InputRightElement>
          </Flex>
          {isExpanded && (
            <Flex position="absolute" zIndex={2} bottom={4} left={4} gap={4}>
              <Flex
                ref={emojiRef}
                fontSize={"20px"}
                onClick={handleEmoji}
                cursor="pointer"
              >
                <BsEmojiSmile cursor="pointer" />
              </Flex>
              {showEmoji &&
                createPortal(
                  <Box
                    zIndex={99}
                    position="absolute"
                    // top={1110 - emojiPosition.y}
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
              <Flex cursor="pointer">
                <LuImagePlus fontSize={"20px"} />
              </Flex>
              <Flex cursor="pointer">
                <MdOutlineGif fontSize={"20px"} />
              </Flex>
              <Flex cursor="pointer">
                <RiText fontSize={"20px"} />
              </Flex>
            </Flex>
          )}
        </InputGroup>
      </Flex>
    );
  }


export default CommentParenting;
