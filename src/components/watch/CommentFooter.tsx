//TODO: make this downvots upvote and reply functional
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import {
  FaCommentAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaRegThumbsUp,
  FaRegThumbsDown,
} from "react-icons/fa";
import { BiComment, BiShare } from "react-icons/bi";
import { ProfileInterface } from "types";
import { useGetMyQuery } from "@/hooks/getUserDetails";
import CommentParenting from "./Comment/CommentParenting";
import { bgcolor } from "@mui/system";
import { BsEmojiSmile } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import { MdOutlineGif } from "react-icons/md";
import { RiText } from "react-icons/ri";

type Props = {
  bgColor: string;
  colorMode: string;
  commentId: string;
};
const CommentFooter = (props: Props) => {
  const [comment, setComment] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showComment = () => {
    setComment(true);
  };
  const hideComment = () => {
    setComment(false);
  };

  const handleEmoji = () => {
    setShowEmoji((prev) => !prev);
  };

  const onEmojiClick = (emojiObject: any) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const getUserProfile: ProfileInterface = useGetMyQuery()?.profile;

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
              >
                <FaRegThumbsUp />
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
                  1000
                </Text>
              </Flex>
            </Box>

            <Flex
              marginLeft={"5px"}
              justifyContent={"center"}
              alignItems="center"
              color={props.colorMode === "dark" ? "white" : "black"}
            >
              {/* <Button variant="outline"> */}
              <FaRegThumbsDown />{" "}
              <Text marginBottom={"0px"} marginLeft={"5px"}>
                {" "}
                Dislike
              </Text>
              {/* </Button> */}
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
            {/* <Button color={"black"} variant="outline">
                        Reply
                    </Button> */}
            <Box
              color={props.colorMode === "dark" ? "white" : "black"}
              marginLeft={"5px"}
            >
              <Flex
                cursor={"pointer"}
                onClick={showComment}
                justifyContent={"center"}
                alignItems="center"
              >
                {/* <Button onClick={showComment} variant="outline"> */}
                <BiComment fontSize={"14px"} />{" "}
                <Text marginBottom={"0px"} marginLeft={"3px"}>
                  Reply
                </Text>
                {/* </Button> */}
              </Flex>
            </Box>
            <Box
              color={props.colorMode === "dark" ? "white" : "black"}
              marginLeft={"10px"}
            ></Box>
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
              placeholder={"Write a comment"}
              borderRadius={"10px"}
              pr="4rem"
              _focus={{ boxShadow: "none" }}
              resize="none"
            />
            <Flex position={"absolute"} bottom={12} right={24}>
              <InputRightElement>
                {" "}
                <Flex>
                  <Button ml={2} onClick={hideComment}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" ml={2}>
                    Comment
                  </Button>
                </Flex>
              </InputRightElement>
            </Flex>
            <Flex position="absolute" bottom={4} left={4} gap={4} zIndex={2}>
              <Flex>
                <BsEmojiSmile
                  fontSize={"20px"}
                  cursor={"pointer"}
                  onClick={handleEmoji}
                />
              </Flex>
              <Flex>
                <LuImagePlus fontSize={"20px"} />
              </Flex>
              <Flex>
                <MdOutlineGif fontSize={"20px"} />
              </Flex>
              <Flex>
                <RiText fontSize={"20px"} />
              </Flex>
              <Box zIndex={1000}>
                <Modal isOpen={showEmoji} onClose={() => setShowEmoji(false)}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        reactionsDefaultOpen={false}
                      />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Flex>
          </InputGroup>
        </Flex>
        // <CommentParenting bgColor={props.bgColor} colorMode={props.colorMode} />
      )}
    </Box>
  );
};

export default CommentFooter;
