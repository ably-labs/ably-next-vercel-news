import Ably from "ably/promises";
import { generateRandomName } from "../../lib/randomNames";

export default async function handler(req, res) {
  const client = new Ably.Realtime(process.env.ABLY_CLIENT_API_KEY);
  const randomName = generateRandomName();
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });
  res.status(200).json(tokenRequestData);
}
