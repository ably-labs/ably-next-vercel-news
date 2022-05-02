/* Used by the client for authentication */

import Ably from "ably/promises";
import { generateRandomName } from "../../lib/randomNames";

export default async function handler(req, res) {
  const rest = new Ably.Rest({
    key: process.env.ABLY_CLIENT_API_KEY,
  });
  const randomName = generateRandomName();

  const tokenRequestData = await rest.auth.createTokenRequest({
    clientId: randomName,
  });
  res.status(200).json(tokenRequestData);
}
