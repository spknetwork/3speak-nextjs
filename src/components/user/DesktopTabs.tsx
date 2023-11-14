import { Box, Link, ListItem, UnorderedList } from '@chakra-ui/react'
import React from 'react'

const DesktopTabs = ({ isMobile, showFeed, updateShowFeed }: any) => {
    return (
        <>
            {!isMobile && (
                <Box marginLeft={'10px'}>
                    {/* marginRight="auto !important" */}
                    <UnorderedList
                        width={"100%"}
                        listStyleType={"none"}
                        paddingLeft="0"
                        display={"flex"}
                        justifyContent={{ base: "start", md: "start", lg: "start" }}
                        marginBottom={"0px"}
                        marginLeft={{ base: "0px", md: "0px" }}
                        flexDirection={{ base: "column", md: "column", lg: "row" }}
                    >
                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showFeed == 1 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showFeed == 1 ? "2px solid red" : ""}
                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => updateShowFeed(1)}
                            >
                                Videos
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showFeed == 2 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showFeed == 2 ? "2px solid red" : ""}
                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => updateShowFeed(2)}
                            >
                                Earnings
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showFeed == 3 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showFeed == 3 ? "2px solid red" : ""}
                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => updateShowFeed(3)}
                            >
                                About
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link
                                href="#"
                                _hover={{
                                    borderBottom: "2px solid red",
                                    color: `${"black"} `,
                                }}
                                _focus={{
                                    color: `${"black"} `,
                                }}
                                color={showFeed == 5 ? "black" : "rgba(0,0,0,0.7)"}
                                borderColor={"red"}
                                textDecoration="none"
                                borderBottom={showFeed == 5 ? "2px solid red" : ""}
                                display={"block"}
                                margin="0 7px"
                                padding={"14px 0 !important"}
                                onClick={() => updateShowFeed(5)}
                            >
                                Achievements
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Box>
            )}
        </>
    )
}

export default DesktopTabs