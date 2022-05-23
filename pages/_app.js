import { configureAbly } from "@ably-labs/react-hooks";
import "../styles/globals.css";

const ably = configureAbly({
  authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} auth={ably.auth} />;
}

export default MyApp;
