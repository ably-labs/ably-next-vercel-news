import Ably from "ably/promises";

export async function getHistoricalMessages() {
  const rest = new Ably.Rest({ key: process.env.ABLY_SERVER_API_KEY });
  const channel = rest.channels.get("headlines");
  const resultPage = await channel.history({ limit: 3 });

  // Must re-parse or certain Message object items can't be serialized by props later:
  // see https://github.com/vercel/next.js/issues/11993
  const mostRecentLast = JSON.parse(JSON.stringify(resultPage.items.reverse()));
  return mostRecentLast;
}
