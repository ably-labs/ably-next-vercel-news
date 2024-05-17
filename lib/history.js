import Ably from 'ably';

export async function getHistoricalMessages() {
  const rest = new Ably.Rest({
    key: process.env.ABLY_SERVER_API_KEY,
  });

  const channel = rest.channels.get('headlines');
  const resultPage = await channel.history({ limit: 5 });
  /*
    See issue: https://github.com/vercel/next.js/issues/11993.
    The JSON must be re-parsed or certain Message object items
    cannot be serialized by props later.
  */
  const historicalMessages = JSON.parse(JSON.stringify(resultPage.items));
  return historicalMessages;
}
