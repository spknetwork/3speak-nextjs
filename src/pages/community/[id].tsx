import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_COMMUNITIES } from "../../graphql/queries";
const CommunityDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic ID from the query object
  const { loading, error, data } = useQuery(GET_COMMUNITIES, {
    variables: { id: id },
  });

  const [showFeed, setShowFeed] = useState<number>(1);

  const showFeedById = (number: number) => {
    setShowFeed(number);
  };

  if (loading) {
    return (
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
        height={"100%"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text
          as={"h1"}
          fontSize="39px"
          textTransform={"uppercase"}
          lineHeight="38px"
        >
          Getting Details...
        </Text>
      </Box>
    );
  }

  if (error) return <p>Error: {error.message}</p>;
  const { community } = data;

  const trendingFeed = data.community.trendingFeed.items;
  const latestFeed = data.community.latestFeed.items;

  // console.log("data.community.latestFeed", data.community.latestFeed);
  return (
    <Box background={"#f9f9fa"}>
      <Box
        position={"relative"}
        display={"inline-block"}
        width="100%"
        minHeight={"400px"}
        backgroundRepeat="no-repeat"
        background={`url("https://media.3speak.tv/user/${id}/cover.png")`}
      >
        <Image
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "#fff none repeat scroll 0 0",
            border: "2px solid #fff",
            borderRadius: "50px",
          }}
          src={`https://images.hive.blog/u/${id}/avatar`}
          width={"90px"}
          height={"90px"}
          alt="Picture of the author"
        />
        <Text
          as={"h1"}
          position={"absolute"}
          bottom="10px"
          left={"150px"}
          fontSize="39px"
          textTransform={"uppercase"}
          lineHeight="38px"
        >
          <Text
            fontWeight={"bolder"}
            color="white"
            textShadow={
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            }
            as={"b"}
          >
            {community.title}
          </Text>
        </Text>
        {/* <Image
          style={{
            position: 'absolute',
            bottom:'10px',
            left:'10px',
            background:'#fff none repeat scroll 0 0',
            border: '2px solid #fff',
            borderRadius:'50px',
          }}
          src={`https://images.hive.blog/u/${id}/avatar`}
          width={'90px'}
          height={'90px'}
          alt="Picture of the author"
        /> */}
      </Box>
      <Box padding={"15px"}>
        <div className="container-fluid">
          <Text
            as={"h4"}
            marginTop="1rem"
            marginBottom={"0.5rem"}
            fontWeight="500"
            lineHeight={"1.2"}
            fontSize="1.21875rem"
          >
            {community?.about}
          </Text>
          <Text as={"p"} margin="0 0 1em">
            Using our Hive-based token (LEO) we reward content creators and
            users for engaging on our platform at https://leofinance.io and
            within our community on the Hive blockchain. Blogging is just the
            beginning of what`s possible in the LeoFinance community and with
            the LEO token: 1). Trade LEO and other Hive-based tokens on our
            exchange: https://leodex.io 2). Track your Hive account statistics
            at https://hivestats.io 3). Opt-in to ads on LEO Apps which drives
            value back into the LEO token economy from ad buybacks. 4). Learn &
            contribute to our crypto-educational resource at https://leopedia.io
            5). Wrap LEO onto the Ethereum blockchain with our cross-chain token
            bridge: https://wleo.io (coming soon) Learn more about us at
            https://leopedia.io/faq
          </Text>
          <Divider
            marginTop={"1rem"}
            marginBottom="1rem"
            border={"0"}
            borderTop="1px solid rgba(0,0,0,0.1)"
          />
          <ul className="nav nav-tab" id="nav-tab" role={"tablist"}>
            <li className="nav-item">
              <a
                className="nav-link active text-dark"
                data-toggle="tab"
                href="#videos"
                role="tab"
              >
                Videos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                data-toggle="tab"
                href="#polls"
                role="tab"
              >
                Polls
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                data-toggle="tab"
                href="#stats"
                role="tab"
              >
                Stats
              </a>
            </li>
          </ul>
          <Divider
            marginTop={"1.5rem"}
            marginBottom="1.5rem"
            border={"0"}
            borderTop="1px solid rgba(0,0,0,0.1)"
          />
          <ButtonGroup
            boxShadow={"1px 1px 4px rgba(0,0,0,0.4)"}
            borderRadius="6px"
            variant="outline"
            isAttached
            spacing="0"
          >
            {/* boxShadow={"0 1px 4px rgba(0,0,0,0.4)"} */}
            <Button
              size="lg"
              className="active"
              onClick={() => showFeedById(1)}
            >
              TRENDING
            </Button>
            {/* boxShadow={"1px 1px 4px rgba(0,0,0,0.4)"} */}
            <Button size="lg" onClick={() => showFeedById(2)}>
              NEW
            </Button>
          </ButtonGroup>
          <Divider
            marginTop={"1.5rem"}
            marginBottom="1.5rem"
            border={"0"}
            borderTop="1px solid rgba(0,0,0,0.1)"
          />
          <Text
            as={"h3"}
            marginTop="1rem"
            marginBottom={"0.5rem"}
            fontWeight="500"
            lineHeight={"1.2"}
            fontSize="1.421875rem"
          >
            {showFeed == 1 && <Text>Trending Video</Text>}
            {showFeed == 2 && <Text>New Video</Text>}
          </Text>
          <Box>
            <Box className="row">
              {showFeed == 1 &&
                trendingFeed.map((item: any, index: number) => (
                  <Box
                    key={index}
                    className="col-xl-2 col-lg-3  col-6 p-2 mb-3"
                  >
                    <Box
                      opacity={"1"}
                      position="relative"
                      transition={"all .6s ease-in-out"}
                      textAlign="center"
                    >
                      {/* item.spkvideo.thumbnail_url */}
                      {/* https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVyPMpqrFtC5XXeBFusWE5kChAqM44ADT8gf6F9n9iyGYf7XdkZGdvjjnk9nHNuzybYprGWG4E?format=jpeg&mode=cover&width=340&height=191 */}
                      {/* <Box></Box> */}
                      <Box
                        left={"5px"}
                        width="50px"
                        background={"#e8e8e8 none repeat scroll 0 0"}
                        borderRadius="2px"
                        bottom={"5px"}
                        color="#000"
                        fontSize={"11px"}
                        fontWeight="500"
                        padding={"0 6px"}
                        position="absolute"
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <Image
                          src="https://3speak.tv/img/play.svg"
                          alt="play"
                        ></Image>
                        <Text as={"span"}>20</Text>
                      </Box>
                      <Box
                        right={"5px"}
                        width="auto"
                        background={"#e8e8e8 none repeat scroll 0 0"}
                        borderRadius="2px"
                        bottom={"5px"}
                        color="#000"
                        fontSize={"11px"}
                        fontWeight="500"
                        padding={"0 6px"}
                        position="absolute"
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <Text as={"span"}>12:48</Text>
                      </Box>
                      <Link href="https://3speak.tv/watch?v=cttpodcast/zjvcobqa">
                        <Image
                          className="img-fluid"
                          borderColor={"transparent!important"}
                          background="linear-gradient(135deg,#171b20 1%,#343a40 100%)"
                          width={"100% !important"}
                          padding="5px"
                          maxHeight={"200px"}
                          height="auto"
                          objectFit="cover"
                          src={`${item.spkvideo.thumbnail_url}`}
                          alt="Dan Abramov"
                        />
                      </Link>
                    </Box>
                    <Box minHeight={"65px"}>
                      <Link
                        textDecoration={"none"}
                        href={`/watch?v=${item.author.username}`}
                      >
                        <Text
                          textDecoration={"none"}
                          fontSize={"13px"}
                          overflowWrap="break-word"
                          textOverflow={"ellipsis"}
                          overflow="hidden"
                          maxHeight={"2.8em"}
                          lineHeight="1.4em"
                          display={"block"}
                          marginTop="0.5rem !important"
                          marginBottom="0.5rem !important"
                          fontWeight={"500"}
                        >
                          {item.title}
                        </Text>
                      </Link>
                      <Box
                        width={"calc( 100% - 1rem )"}
                        display="block"
                        position={"unset"}
                      >
                        <Box
                          display={"block !important"}
                          marginTop="0.5rem !important"
                          justifyContent={"justify !important"}
                        >
                          <p className="black_col">
                            <b>
                              <Link href="/user/cttpodcast">
                                <i className="fa fa-user"></i>
                                {item.author.username}
                              </Link>
                            </b>
                          </p>
                          <p>a day ago</p>
                          <p>
                            <b>$63.17</b>
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}

              {showFeed == 2 &&
                latestFeed.map((item: any, index: number) => (
                  <Box
                    key={index}
                    className="col-xl-2 col-lg-3  col-6 p-2 mb-3"
                  >
                    <Box
                      opacity={"1"}
                      position="relative"
                      transition={"all .6s ease-in-out"}
                      textAlign="center"
                    >
                      {/* item.spkvideo.thumbnail_url */}
                      {/* https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfHesJoVyPMpqrFtC5XXeBFusWE5kChAqM44ADT8gf6F9n9iyGYf7XdkZGdvjjnk9nHNuzybYprGWG4E?format=jpeg&mode=cover&width=340&height=191 */}
                      {/* <Box></Box> */}
                      <Box
                        left={"5px"}
                        width="50px"
                        background={"#e8e8e8 none repeat scroll 0 0"}
                        borderRadius="2px"
                        bottom={"5px"}
                        color="#000"
                        fontSize={"11px"}
                        fontWeight="500"
                        padding={"0 6px"}
                        position="absolute"
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <Image
                          src="https://3speak.tv/img/play.svg"
                          alt="play"
                        ></Image>
                        <Text as={"span"}>20</Text>
                      </Box>
                      <Box
                        right={"5px"}
                        width="auto"
                        background={"#e8e8e8 none repeat scroll 0 0"}
                        borderRadius="2px"
                        bottom={"5px"}
                        color="#000"
                        fontSize={"11px"}
                        fontWeight="500"
                        padding={"0 6px"}
                        position="absolute"
                        display="flex"
                        justifyContent={"space-between"}
                      >
                        <Text as={"span"}>12:48</Text>
                      </Box>
                      <Link href="https://3speak.tv/watch?v=cttpodcast/zjvcobqa">
                        <Image
                          className="img-fluid"
                          borderColor={"transparent!important"}
                          background="linear-gradient(135deg,#171b20 1%,#343a40 100%)"
                          width={"100% !important"}
                          padding="5px"
                          maxHeight={"200px"}
                          height="auto"
                          objectFit="cover"
                          src={`${item.spkvideo.thumbnail_url}`}
                          alt="Dan Abramov"
                        />
                      </Link>
                    </Box>
                    <Box minHeight={"65px"}>
                      <Text
                        fontSize={"13px"}
                        overflowWrap="break-word"
                        textOverflow={"ellipsis"}
                        overflow="hidden"
                        maxHeight={"2.8em"}
                        lineHeight="1.4em"
                        display={"block"}
                        marginTop="0.5rem !important"
                        marginBottom="0.5rem !important"
                        fontWeight={"500"}
                      >
                        {item.title}
                      </Text>
                      <Box
                        width={"calc( 100% - 1rem )"}
                        display="block"
                        position={"unset"}
                      >
                        <Box
                          display={"block !important"}
                          marginTop="0.5rem !important"
                          justifyContent={"justify !important"}
                        >
                          <p className="black_col">
                            <b>
                              <Link href="/user/cttpodcast">
                                <i className="fa fa-user"></i>
                                {item.author.username}
                              </Link>
                            </b>
                          </p>
                          <p>a day ago</p>
                          <p>
                            <b>$63.17</b>
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default CommunityDetails;
