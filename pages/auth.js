import Ably from "ably/promises";

export default async function handler(req, res) {
  console.log(process.env.ABLY_SERVER_API_KEY);
  const client = new Ably.Realtime(process.env.ABLY_SERVER_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo-server",
  });
  res.status(200).json(tokenRequestData);
}
