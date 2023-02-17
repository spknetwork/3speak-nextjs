import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { Box, Sidebar } from "src/components";
import styled from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isAuth = pathname.includes("/auth");

  return (
      <StyledGrid>
        <Box>{!isAuth && <Sidebar />}</Box>
        <Box backgroundColor="#fafafa">
          <Component {...pageProps} />
        </Box>
      </StyledGrid>
  );
}

const StyledGrid = styled(Box)`
  display: grid;
  grid-template-columns: 0.5fr 3fr;
  grid-template-rows: 1fr;
  width: 100%;
  min-height: 100vh;
`;

export default MyApp
