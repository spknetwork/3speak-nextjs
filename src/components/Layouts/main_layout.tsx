import { Box, Flex } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { Sidebar } from '../Sidebar'
import Footer from '../footer/Footer'
import MiniSidebar from '../MiniSidebar/MiniSidebar'

const MainLayout = ({ children }: any) => {
    return (
        <Flex
            css={css`
            @media (max-width: 768px) {
            flex-direction: column;
            }

            @media (min-width: 769px) {
            flex-direction: row;
            }
        `}
        justifyContent={"flex-end"}
        >
            <nav>
                <Box><MiniSidebar /></Box>
            </nav>
            <Flex
                width={"97%"}
                css={css`
                    @media (max-width: 768px) {
                        flex-direction: column;
                    }

                    @media (min-width: 769px) {
                        flex-direction: column;
                    }
                `}
            >
                <main>
                    {children}
                </main>
                <Footer/>
            </Flex>
           
        </Flex>
    )
}

export default MainLayout