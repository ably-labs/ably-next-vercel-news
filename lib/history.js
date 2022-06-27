import Ably from "ably";

const rest = new Ably.Rest.Promise({
  key: process.env.ABLY_SERVER_API_KEY,
});

const channel = rest.channels.get("headlines");

export async function getHistoricalMessages() {
  const resultPage = await channel.history({ limit: 5 });
  const historicalMessages = JSON.parse(JSON.stringify(resultPage.items));
  return historicalMessages;
}
