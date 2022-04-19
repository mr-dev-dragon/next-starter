import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "./styles.css";

const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session} refetchInterval={0}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
