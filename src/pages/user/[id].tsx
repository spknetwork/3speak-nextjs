import About from "@/components/user/About";
import Achievements from "@/components/user/Achievements";
import Earnings from "@/components/user/Earnings";
import Livestream from "@/components/user/Livestream";
import { HamburgerIcon } from "@chakra-ui/icons";
//TODO: remove the earnings and achievements in the user page
//TODO: also correct the alignment for the cover page

import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
    useDisclosure,
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
import { useAppStore } from "@/lib/store";
import StatsModal from "@/components/Modal/StatsModal";
import DelegateRCModal from "@/components/Modal/DelegateRCModal";
import axios from "axios";
import VideosTitle from "@/components/VideosTitle";
import Name from "@/components/user/Name";

const UserPage: React.FC = () => {
    const [urlInfo, seturlInfo] = useState<any>(null);

    useEffect(() => {
        console.log("urlInfo", urlInfo)
    }, [urlInfo])
    const { userDetails } = useAppStore();
    const [currentUser, setcurrentUser] = useState<any>(null);
    const { isOpen: isOpenModalStats, onOpen: onOpenModalStats, onClose: onCloseModalStats } = useDisclosure()
    const { isOpen: isOpenModalEditDelegate, onOpen: onOpenModalEditDelegate, onClose: onCloseModalEditDelegate } = useDisclosure()


    useEffect(() => {
        if (userDetails?.username) {
            console.log("userDetails?.username?", userDetails?.username)
            setcurrentUser(userDetails)
        }
    }, [userDetails])

    useEffect(() => {
        if (currentUser) {
            console.log("currentUser", currentUser)
        }
    }, [currentUser])

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

    const { loading: loadingList, error: errorList, data: dataList } = useQuery(GET_SOCIAL_FEED_BY_CREATOR, {
        variables: { id: id },
    });

    const [isCreate, setisCreate] = useState<any>(false);

    const seturlInfoFun = (data: any) => {
        seturlInfo(data)
        if (data && data.create) {
            setisCreate(true)
        }
        onOpenModalEditDelegate()
    }
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
    }, [isMobile, showNav]);


    const [directDelegations, setDirectDelegations] = useState<any>(null);
    const list_rc_direct_delegations = async (from: any, to: any, limit: any) => {
        try {
            const response = await axios.post('https://api.hive.blog', {
                jsonrpc: '2.0',
                id: 1,
                method: 'rc_api.list_rc_direct_delegations',
                params: {
                    start: [`${userDetails?.username}`, ""],
                    limit: 100
                }
            });
            return response.data.result;
        } catch (error) {
            console.error('Error fetching direct delegations:', error);
            throw error;
        }
    };
    const rerenderList = () => {
        const from = userDetails?.username; // Replace with the 'from' account
        const to = "";   // Replace with the 'to' account
        const limit = 50;
        list_rc_direct_delegations(from, to, limit)
            .then((result: any) => {
                setDirectDelegations(result);
            })
            .catch((error: any) => {
                console.error('Error fetching direct delegations:', error);
            });
    }
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
                        {
                            currentUser?.username.toLowerCase() == userProfile?.profile?.username.toLowerCase() && (
                                <Box>
                                    <Alert onClick={() => onOpenModalStats()} cursor={'pointer'} fontSize={'12px'} marginLeft={'5px'} width={'80px'} borderRadius={'10px'} status='info'>
                                        <AlertIcon />
                                        Stats
                                    </Alert>
                                    <StatsModal list_rc_direct_delegations={list_rc_direct_delegations} directDelegations={directDelegations} setDirectDelegations={setDirectDelegations} seturlInfo={seturlInfoFun} userDetails={userDetails} isOpenModalStats={isOpenModalStats} onCloseModalStats={onCloseModalStats} />
                                    <DelegateRCModal rerenderList={rerenderList} isCreate={isCreate} selectedUser={urlInfo} isOpenModalEditDelegate={isOpenModalEditDelegate} onCloseModalEditDelegate={onCloseModalEditDelegate} />
                                </Box>

                            )
                        }

                        {/* <Box>
                                    <Alert onClick={() =>onOpenModalStats() } cursor={'pointer'} fontSize={'12px'} marginLeft={'5px'} width={'80px'} borderRadius={'10px'} status='info'>
                                        <AlertIcon />
                                        Stats
                                    </Alert>
                                    <StatsModal list_rc_direct_delegations={list_rc_direct_delegations} directDelegations={directDelegations} setDirectDelegations={setDirectDelegations}  seturlInfo={seturlInfoFun} userDetails={userDetails} isOpenModalStats={isOpenModalStats} onCloseModalStats={onCloseModalStats}/>
                                    <DelegateRCModal rerenderList={rerenderList} isCreate={isCreate} selectedUser={urlInfo} isOpenModalEditDelegate={isOpenModalEditDelegate} onCloseModalEditDelegate={onCloseModalEditDelegate}/>
                                </Box> */}

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
                        <Grid padding={"20px"} templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(2, 1fr)",
                            xl: "repeat(5, 1fr)",
                            }}
                            gap={10}>
                            {showFeed == 1 && videoList.length > 0 &&
                                videoList.map((item: VideoInterface, index: number) => (
                                    <GridItem w="100%" h="100%" key={index}>
                                        <Box height="13em !important"
                                            width="100% !important">
                                            <Image
                                                height="13em !important"
                                                width="100% !important"
                                                borderRadius={'10px'}
                                                objectFit="cover"
                                                alt="test"
                                                src={`${item.spkvideo?.thumbnail_url}`}
                                            />
                                        </Box>

                                        <VideosTitle title={`${item.title}`} />
                                        <Name username={`${item.username}`} />
                                        <Text as="p" margin={"1px"}>
                                            a day ago
                                        </Text>
                                        <Text fontWeight={"bold"} as="p">
                                            $ 10.10
                                        </Text>
                                    </GridItem>
                                    // <VideoComponent  index={index} thumbnail={item.spkvideo?.thumbnail_url} title={item.title} username={item.username} number_views={item.number_views} key={index} author={item?.author?.username} />
                                ))}
                        </Grid>

                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default UserPage;
