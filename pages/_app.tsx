import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { store } from "state/store";
import { useRouter } from "next/router";
import { Box, Sidebar } from "components";
import styled from "styled-components";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isAuth = pathname.includes("/auth");

  return (
    <Provider store={store}>
      <StyledGrid>
        <Box>{!isAuth && <Sidebar />}</Box>
        <Box backgroundColor="#fafafa">
          <Component {...pageProps} />
        </Box>
      </StyledGrid>
    </Provider>
  );
}

const StyledGrid = styled(Box)`
  display: grid;
  grid-template-columns: 0.75fr 3fr;
  grid-template-rows: 1fr;
  width: 100%;
  min-height: 100vh;
`;

export default MyApp
