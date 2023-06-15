import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import CommentFooter from "./CommentFooter";
const Comment = () => {
  const [comment, setComment] = useState("");

  return (
    <Box>
      <Box
        marginBottom={"1rem !important"}
        marginTop="0.25rem !important"
        padding={"15px"}
        background="#fff none repeat scroll 0 0"
        borderRadius={"2px"}
        boxShadow="0 0 11px #ececec"
        transitionDuration={"0.4s"}
      >
        <Box>
          <Box
            maxWidth={"100%"}
            width="100%"
            paddingRight={"15px"}
            paddingLeft="15px"
          >
            {/* <Text
              color={"#666"}
              fontSize="0.8125rem"
              marginBottom={"0.5rem"}
              fontWeight="500"
              lineHeight={"1.2"}
            >
              Add Comment:
            </Text> */}
            <Text
              background={
                "#9C27B0 linear-gradient(180deg, #ab47bc, #9C27B0) repeat-x"
              }
              color="#fff"
              paddingRight={"2.5rem"}
              border="none"
              padding={"0.75rem 1.25rem"}
              marginBottom="1rem"
              borderRadius={"0.25rem"}
            >
              To comment on this video please connect a HIVE account to your
              profile: <Link>Connect HIVE Account</Link>
            </Text>
            <Box>
              <Flex>
                <Box alignSelf={"flex-start"} marginRight="20px">
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </Box>
                <Box width={"100%"}>
                  <Flex flexDirection={"column"}>
                    <Textarea
                      width={"100%"}
                      color="black"
                      placeholder="Add comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Flex
                      marginTop={"10px"}
                      justifyContent="end"
                      alignItems={"center"}
                    >
                      <Button
                        colorScheme="gray"
                        color={"black"}
                        marginRight={"10px"}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={true}
                        color={comment ? "white" : "black"}
                        colorScheme={comment ? "messenger" : "gray"}
                      >
                        Comment
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
      <Flex
        marginTop={"16px"}
        color={"black"}
        fontSize={"0.8125rem"}
        marginBottom="0.5rem"
        fontWeight={"500"}
        lineHeight="1.2"
      >
        <FaCommentAlt fontSize={"15px"} />{" "}
        <Text fontSize={"15px"} marginLeft={"5px"}>
          Comments:
        </Text>
      </Flex>
      <Box
        background="#fff none repeat scroll 0 0"
        borderRadius={"2px"}
        boxShadow="0 0 11px #ececec"
        transitionDuration={"0.4s"}
        boxSizing="border-box"
        paddingRight={"16px"}
        paddingLeft={"16px"}
        margin="1px 0px 16px 0px"
        paddingBottom={"16px"}
      >
        <Box maxHeight={"2000px"} overflow="hidden" position={"relative"}>
          <Box padding={"0px"} paddingTop="20px">
            {/* main div */}
            <Box
              paddingLeft={"16px"}
              boxSizing="border-box"
              overflow={"visible"}
              position="relative"
              transition={"background 1s"}
              width="100%"
            >
              {/* first box for the line */}
              {/* second box for the main content */}
              <Box
                background="transparent"
                borderRadius={"4px"}
                display="flex"
                position="relative"
                transition={"color .5s,fill .5s,background 1s"}
                padding="8px 0 0 8px"
                alignItems={"center"}
              >
                {/* div for avatar */}
                <Box
                  display={"block"}
                  position="absolute"
                  top={"45px"}
                  left="21px"
                  width={"12px"}
                  height={"calc(100% - 50px)"}
                  borderLeft="4px solid transparent"
                  borderRight={"4px solid transparent"}
                  backgroundColor="#edeff1"
                  backgroundClip={"padding-box"}
                ></Box>
                <Box alignSelf={"flex-start"}>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </Box>

                {/* div for content */}
                <Box
                  marginLeft={"8px"}
                  borderRadius="4px"
                  border={"1px solid transparent"}
                  boxSizing="border-box"
                  maxWidth={"800px"}
                  width="calc(100% - 56px)"
                  padding={"0 20px"}
                  paddingLeft="0px"
                  alignSelf="flex-start"
                >
                  {/* div for title */}
                  <Box
                    marginTop={"10px"}
                    marginLeft="0"
                    min-height={"18px"}
                    marginBottom="6px"
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"flex-start"}
                  >
                    <Text
                      color={"black"}
                      fontSize="xl"
                      fontWeight={"bold"}
                      minHeight={"18px"}
                      display="flex"
                      alignItems={"center"}
                      flexFlow="row wrap"
                      justifyContent={"flex-start"}
                    >
                      (sm) In love with React & Next
                    </Text>
                  </Box>
                  {/* box for maint content */}
                  <Box padding={"2px 0"} width="100%" color={"black"}>
                    Hotel management is really about successfully overseeing
                    every operation of the business to make sure consistent
                    growth and development. This can involve the management of
                    anything related to the hotel industry and needs knowledge
                    of distribution strategy, finance and accounts, customer
                    service, staff management, marketing, catering management,
                    hotel administration and more. Hotel management software is
                    a technology that permits hotel operators and owners to
                    streamline their administrative tasks while also increasing
                    their bookings in both the short and long term. Your hotel
                    management system is not only important for your own
                    day-to-day operations, but it is a vital part of improving
                    the overall guest experience. From the beginning of your
                    customers’ online booking journey until the completion of
                    their stay and their feedback once
                  </Box>

                  {/* box for footer */}
                  <CommentFooter />

                  {/* reply */}
                  <Box marginLeft={"28px"}>
                    <Box
                      margin={"20px auto"}
                      background="transparent"
                      borderRadius={"4px"}
                      display="flex"
                      position="relative"
                      transition={"color .5s,fill .5s,background 1s"}
                      padding="8px 0 0 8px"
                      alignItems={"center"}
                    >
                      <Box
                        display={"block"}
                        position="absolute"
                        top={"45px"}
                        left="21px"
                        width={"12px"}
                        height={"calc(100% - 50px)"}
                        borderLeft="4px solid transparent"
                        borderRight={"4px solid transparent"}
                        backgroundColor="#edeff1"
                        backgroundClip={"padding-box"}
                      ></Box>
                      <Box alignSelf={"flex-start"}>
                        <Avatar
                          name="Kent Dodds"
                          src="https://bit.ly/kent-c-dodds"
                        />
                        {/* <Avatar
                          name="Dan Abrahmov"
                          src="https://bit.ly/dan-abramov"
                        /> */}
                      </Box>
                      {/* div for content */}
                      <Box
                        marginLeft={"8px"}
                        borderRadius="4px"
                        border={"1px solid transparent"}
                        boxSizing="border-box"
                        maxWidth={"800px"}
                        width="calc(100% - 56px)"
                        padding={"0 20px"}
                        paddingLeft="0px"
                        alignSelf="flex-start"
                      >
                        {/* div for title */}
                        <Box
                          marginTop={"10px"}
                          marginLeft="0"
                          min-height={"18px"}
                          marginBottom="6px"
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"flex-start"}
                        >
                          <Text
                            color={"black"}
                            fontSize="xl"
                            fontWeight={"bold"}
                            minHeight={"18px"}
                            display="flex"
                            alignItems={"center"}
                            flexFlow="row wrap"
                            justifyContent={"flex-start"}
                          >
                            (sm) In love with React & Next
                          </Text>
                        </Box>
                        {/* box for maint content */}
                        <Box padding={"2px 0"} width="100%" color={"black"}>
                          Hotel management is really about successfully
                          overseeing every operation of the business to make
                          sure consistent growth and development. This can
                          involve the management of anything related to the
                          hotel industry and needs knowledge of distribution
                          strategy, finance and accounts, customer service,
                          staff management, marketing, catering management,
                          hotel administration and more. Hotel management
                          software is a technology that permits hotel operators
                          and owners to streamline their administrative tasks
                          while also increasing their bookings in both the short
                          and long term. Your hotel management system is not
                          only important for your own day-to-day operations, but
                          it is a vital part of improving the overall guest
                          experience. From the beginning of your customers’
                          online booking journey until the completion of their
                          stay and their feedback once
                        </Box>

                        {/* box for footer */}
                        <CommentFooter />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* 2ND COMMENT */}
            <Box
              paddingLeft={"16px"}
              boxSizing="border-box"
              overflow={"visible"}
              position="relative"
              transition={"background 1s"}
              width="100%"
            >
              {/* first box for the line */}
              {/* second box for the main content */}

              <Box
                background="transparent"
                borderRadius={"4px"}
                display="flex"
                position="relative"
                transition={"color .5s,fill .5s,background 1s"}
                padding="8px 0 0 8px"
                alignItems={"center"}
              >
                {/* div for avatar */}
                <Box
                  display={"block"}
                  position="absolute"
                  top={"45px"}
                  left="21px"
                  width={"12px"}
                  height={"calc(100% - 50px)"}
                  borderLeft="4px solid transparent"
                  borderRight={"4px solid transparent"}
                  backgroundColor="#edeff1"
                  backgroundClip={"padding-box"}
                ></Box>
                <Box alignSelf={"flex-start"}>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                </Box>

                {/* div for content */}
                <Box
                  marginLeft={"8px"}
                  borderRadius="4px"
                  border={"1px solid transparent"}
                  boxSizing="border-box"
                  maxWidth={"800px"}
                  width="calc(100% - 56px)"
                  padding={"0 20px"}
                  paddingLeft="0px"
                  alignSelf="flex-start"
                >
                  {/* div for title */}
                  <Box
                    marginTop={"10px"}
                    marginLeft="0"
                    min-height={"18px"}
                    marginBottom="6px"
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"flex-start"}
                  >
                    <Text
                      color={"black"}
                      fontSize="xl"
                      fontWeight={"bold"}
                      minHeight={"18px"}
                      display="flex"
                      alignItems={"center"}
                      flexFlow="row wrap"
                      justifyContent={"flex-start"}
                    >
                      (sm) In love with React & Next
                    </Text>
                  </Box>
                  {/* box for maint content */}
                  <Box padding={"2px 0"} width="100%" color={"black"}>
                    Hotel management is really about successfully overseeing
                    every operation of the business to make sure consistent
                    growth and development. This can involve the management of
                    anything related to the hotel industry and needs knowledge
                    of distribution strategy, finance and accounts, customer
                    service, staff management, marketing, catering management,
                    hotel administration and more. Hotel management software is
                    a technology that permits hotel operators and owners to
                    streamline their administrative tasks while also increasing
                    their bookings in both the short and long term. Your hotel
                    management system is not only important for your own
                    day-to-day operations, but it is a vital part of improving
                    the overall guest experience. From the beginning of your
                    customers’ online booking journey until the completion of
                    their stay and their feedback once
                  </Box>

                  {/* box for footer */}
                  <CommentFooter />

                  {/* reply */}
                  <Box marginLeft={"28px"}>
                    <Box
                      margin={"20px auto"}
                      background="transparent"
                      borderRadius={"4px"}
                      display="flex"
                      position="relative"
                      transition={"color .5s,fill .5s,background 1s"}
                      padding="8px 0 0 8px"
                      alignItems={"center"}
                    >
                      <Box
                        display={"block"}
                        position="absolute"
                        top={"45px"}
                        left="21px"
                        width={"12px"}
                        height={"calc(100% - 50px)"}
                        borderLeft="4px solid transparent"
                        borderRight={"4px solid transparent"}
                        backgroundColor="#edeff1"
                        backgroundClip={"padding-box"}
                      ></Box>
                      <Box alignSelf={"flex-start"}>
                        <Avatar
                          name="Kent Dodds"
                          src="https://bit.ly/kent-c-dodds"
                        />
                        {/* <Avatar
                          name="Dan Abrahmov"
                          src="https://bit.ly/dan-abramov"
                        /> */}
                      </Box>
                      {/* div for content */}
                      <Box
                        marginLeft={"8px"}
                        borderRadius="4px"
                        border={"1px solid transparent"}
                        boxSizing="border-box"
                        maxWidth={"800px"}
                        width="calc(100% - 56px)"
                        padding={"0 20px"}
                        paddingLeft="0px"
                        alignSelf="flex-start"
                      >
                        {/* div for title */}
                        <Box
                          marginTop={"10px"}
                          marginLeft="0"
                          min-height={"18px"}
                          marginBottom="6px"
                          display={"flex"}
                          flexDirection="column"
                          alignItems={"flex-start"}
                        >
                          <Text
                            color={"black"}
                            fontSize="xl"
                            fontWeight={"bold"}
                            minHeight={"18px"}
                            display="flex"
                            alignItems={"center"}
                            flexFlow="row wrap"
                            justifyContent={"flex-start"}
                          >
                            (sm) In love with React & Next
                          </Text>
                        </Box>
                        {/* box for maint content */}
                        <Box padding={"2px 0"} width="100%" color={"black"}>
                          Hotel management is really about successfully
                          overseeing every operation of the business to make
                          sure consistent growth and development. This can
                          involve the management of anything related to the
                          hotel industry and needs knowledge of distribution
                          strategy, finance and accounts, customer service,
                          staff management, marketing, catering management,
                          hotel administration and more. Hotel management
                          software is a technology that permits hotel operators
                          and owners to streamline their administrative tasks
                          while also increasing their bookings in both the short
                          and long term. Your hotel management system is not
                          only important for your own day-to-day operations, but
                          it is a vital part of improving the overall guest
                          experience. From the beginning of your customers’
                          online booking journey until the completion of their
                          stay and their feedback once
                        </Box>

                        {/* box for footer */}
                        <CommentFooter />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;
