import '../styles/globals.css';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';

export default function App({ Component, pageProps }) {
  const client = new Ably.Realtime({
    authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="headlines" options={{ params: { rewind: '5' } }}>
        <Component {...pageProps} />;
      </ChannelProvider>
    </AblyProvider>
  );
}
