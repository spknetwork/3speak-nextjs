import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../state/store";
import { useRouter } from "next/router";
import { Box, Sidebar } from "src/components";
import styled from "styled-components";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.css";
config.autoAddCss = false;

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
  grid-template-columns: 0.5fr 3fr;
  grid-template-rows: 1fr;
  width: 100%;
  min-height: 100vh;
`;

export default MyApp;
