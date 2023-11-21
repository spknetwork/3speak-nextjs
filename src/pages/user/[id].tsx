import About from "@/components/user/About";
import Achievements from "@/components/user/Achievements";
import Earnings from "@/components/user/Earnings";
import Livestream from "@/components/user/Livestream";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SocialFeedInterface, VideoInterface } from "types";
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, GET_SOCIAL_FEED_BY_CREATOR } from "@/graphql/queries";
import { UserInterface } from "types";
import VideoComponent from "@/components/VideoComponent";
import MobileNav from "@/components/studio_mobilenav/StudioMobileNav";
import MobileTabs from "@/components/user/MobileTabs";
import DesktopTabs from "@/components/user/DesktopTabs";

const UserPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    // Initialize other properties as needed
    const [userProfile, setuserProfile] = useState<UserInterface>({
        profile: {
            about: '',
            name: '',
            username: ''
        },
    });

    const [videoList, setvideoList] = useState<any>([]);

    // call user graphql here
    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: { id: id },
    });

    const { loading:loadingList, error:errorList, data:dataList } = useQuery(GET_SOCIAL_FEED_BY_CREATOR, {
        variables: { id: id },
    });

    useEffect(() => {
        if (!loadingList && !errorList && dataList) {
            console.log('data list', dataList.socialFeed)
            setvideoList([...dataList.socialFeed.items])
            // console.log("videoList",videoList)
            // setuserProfile(data)
        }
        if (errorList) {
            console.log('error list', errorList)

        }
    }, [loadingList, errorList, dataList]);

    useEffect(() => {
        if (!loading && !error && data) {
            console.log('data', data)
            setuserProfile(data)
        }
        if (error) {
            console.log('error', error)

        }
    }, [loading, data, error]);

    useEffect(() => {
        if (videoList) {
            console.log('videoList', videoList)
        }
    }, [videoList]);
    useEffect(() => {
        if (userProfile) {
            console.log('userProfile', userProfile)
        }
    }, [userProfile]);

    const [showFeed, setShowFeed] = useState<number>(1);
    const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
    const [showNav, setShowNav] = useState(true);
    const updateShowFeed = (number: number) => {
        setShowFeed(number);
    };

    useEffect(() => {
        console.log("isMobile", isMobile);
        if (isMobile) {
            setShowNav(true);
            console.log("showNav", showNav);
        } else {
            setShowNav(false);
            console.log("showNav", showNav);
        }
    }, [isMobile]);

    const [videos] = useState<VideoInterface[]>([
        {
            thumbnail:
                "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVijsuv81Cu6QUxATfwLCchp7dhexyXdq6vj7hSxy7PKLRNLf5CYPBTwYKRDj6dR95KAhZkjwL?format=jpeg&mode=cover&width=340&height=191",
            title:
                "The Adventure trail of Mount Naupa and Mind2Mind Talk with Lakwatserong Engineer",
            username: "thetrollingmind",
        },
        {
            thumbnail:
                "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVhbe9xjZvwDJDwq34KonBAhp6aDi5QWVMa8GKtBZHpfb4pz88JsvtNudXgZBf9vd4ahzvcP1p?format=jpeg&mode=cover&width=340&height=191",
            title: "Refreshing Communal Ranch in Bukidnon Philippines",
            username: "thetrollingmind",
        },
        {
            thumbnail:
                "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVb4cnggfP19UUoMFibN8JndfBo44LsTNKVZ5tXRYFs7vB9bWocqyN3CFG7xfRFuKAomRBmvQ6?format=jpeg&mode=cover&width=340&height=191",
            title: "Via Crucis at Camari Hill | Lenten Tradition",
            username: "thetrollingmind",
        },
        {
            thumbnail:
                "https://images.hive.blog/p/99pyU5Ga1kwr5bsMXthzYLbcngN4W2P8NtU9TWTdHC3HaQbjuuRfKKVdjVbFQdnkVpujsZq5ivaUS3RobVsvgoUMDXSTgZCHfbwNsgBSuTKvqmnzt9EUtxERKUQ5963fSE?format=jpeg&mode=cover&width=340&height=191",
            title: "Weekend Adventure- to the Mountain of Kan-irag",
            username: "thetrollingmind",
        },
    ]);
    return (
        <div>
            <Box minHeight={"280px"} position={"relative"} display="flex" justifyContent={'center'}>
                {userProfile.profile?.images?.cover && (
                    <Image
                        alt="image"
                        src={userProfile.profile.images?.cover}
                        objectFit="cover"
                        objectPosition={"center"}
                        maxHeight="500px"
                        maxWidth={"100%"}
                        height="auto"
                    />
                )}

                <Flex
                    bottom={"0"}
                    left="0"
                    right={"0"}
                    position="absolute"
                    alignItems={"end"}
                    padding="1rem 30px"
                    justifyContent={{ base: "center", md: "center", lg: "start" }}
                >
                    {userProfile.profile?.images?.avatar && (
                        <Image
                            alt="image"
                            background={"#fff none repeat scroll 0 0"}
                            src={userProfile.profile.images?.avatar}
                            border={"2px solid #fff"}
                            borderRadius="50px"
                            height={"90px"}
                            width="90px"
                        />
                    )}
                    <Link
                        textDecoration={"none"}
                        backgroundColor="transparent"
                        transition={"all 0.2s"}
                    >
                        <Image
                            alt="image"
                            src="/images/rss.webp"
                            width={"26px !important"}
                            marginLeft="5px !important"
                            height={"26px !important"}
                            verticalAlign="bottom !important"
                            border={"1px solid #fff !important"}
                            borderRadius="10% !important"
                            background={"rgba(255,255,255,.7) !important"}
                            padding="2px !important"
                        />
                    </Link>
                </Flex>
            </Box>
            <Box
                padding={"0 0px "}
                boxShadow="0 0 11px #ececec"
                background={"#fff none repeat scroll 0 0!important"}
            >
                <Box
                    padding={"10px"}
                    paddingRight="0px"
                    boxShadow="0 1px 2px transparent!important"
                    border={"none"}
                    display="flex"
                    justifyContent={"flex-start"}
                    alignItems="center"
                    position={"relative"}
                    flexFlow="row nowrap"
                    flexDirection={{ base: "column", md: "column", lg: "row" }}
                >

                    <Flex
                        css={css`
                            @media (max-width: 1023px) {
                                justify-content: space-between;
                                flex-direction: row;
                                align-items: center;
                            }

                            @media (min-width: 1024px) {
                                justify-content: start;
                                flex-direction: row;
                                align-items: center;
                            }
                        `}
                        width="100%"
                    >
                        <Link
                            href="#"
                            fontSize={"16px"}
                            fontWeight="700"
                            transition={"all 0.2s"}
                            backgroundColor="transparent"
                            textDecoration={"none !important"}
                        >
                            {userProfile?.profile?.username && userProfile?.profile?.name && (
                                <label htmlFor="username"><b>{userProfile.profile.name} ({userProfile.profile.username})</b></label>
                            )}
                        </Link>
                        {isMobile && (
                            <Button
                                variant={"ghost"}
                                onClick={() => setShowNav(!showNav)}
                                colorScheme="black"
                            >
                                <HamburgerIcon boxSize={"3rem"} />
                            </Button>
                        )}
                        <DesktopTabs isMobile={isMobile} showFeed={showFeed} updateShowFeed={updateShowFeed} />
                    </Flex>

                    {!showNav && (
                        <MobileTabs isMobile={isMobile} showFeed={showFeed} updateShowFeed={updateShowFeed} />
                    )}
                </Box>
            </Box>
            <Box padding={"15px"}>
                <Box>
                    <Box className="row">
                        {showFeed == 2 && (
                            <Earnings />
                        )}
                        {showFeed == 3 && (
                            <About profile={userProfile.profile} />
                        )}

                        {showFeed == 4 && (
                            <Livestream />
                        )}

                        {showFeed == 5 && (
                            <Achievements />
                        )}

                        {showFeed == 1 &&
                            videos.map((item: VideoInterface, index: number) => (
                                <VideoComponent index={index} thumbnail={item.thumbnail} title={item.title} username={item.username} number_views={item.number_views} key={index} />
                            ))}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default UserPage;
