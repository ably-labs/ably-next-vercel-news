import Ably from 'ably';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default async function handler(req, res) {
  const client = new Ably.Rest(process.env.ABLY_CLIENT_API_KEY);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });

  res.status(200).json(tokenRequestData);
}
