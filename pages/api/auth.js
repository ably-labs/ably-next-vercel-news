import Ably from "ably";
import { generateRandomName } from "../../lib/randomNames";
const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

export default async function handler(request, response) {
  const tokenParams = {
    clientId: generateRandomName(),
  };
  rest.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
    if (err) {
      response
        .status(500)
        .send("Error requesting token: " + JSON.stringify(err));
    } else {
      response.setHeader("Content-Type", "application/json");
      response.status(200).send(JSON.stringify(tokenRequest));
    }
  });
}
