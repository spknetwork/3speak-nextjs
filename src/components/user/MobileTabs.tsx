import { Box, Button, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'

const MobileTabs = ({ isMobile, showFeed, updateShowFeed }: any) => {
    return (
        <Box
            display={"flex"}
            flexBasis="auto"
            flexGrow={"1"}
            alignItems="center"
            width={{ base: "100%", md: "100%" }}
            flexDirection={{ base: "column", md: "column", lg: "row" }}
        >
            {isMobile && (
                <Box
                    width={"100%"}
                    paddingLeft="0"
                    display={"flex"}
                    justifyContent={{ base: "start", md: "start", lg: "start" }}
                    marginBottom={"0px"}
                    marginLeft={{ base: "0px", md: "0px" }}
                    flexDirection={{ base: "column", md: "column", lg: "row" }}
                >
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
            <Box marginRight={{ base: '0px', md: "0px", lg: "10px" }} display={'flex'} justifyContent={{ base: "start", md: "start", lg: "end" }} width={{ base: "100%", md: "100%" }}>
                <Button
                    textTransform={"uppercase"}
                    border="none"
                    boxShadow={"0 1px 4px rgba(0,0,0,0.4)"}
                    transition="all 0.4s"
                    variant={"outline"}
                    colorScheme="white"
                    fontWeight={'100'}
                >
                    Follow  <Text margin={'0px'} marginLeft='5px' fontWeight={'bold'}>66.5k</Text>
                </Button>
            </Box>
        </Box>
    )
}

export default MobileTabs