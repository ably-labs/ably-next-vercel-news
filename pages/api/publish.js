import Ably from "ably/promises";
const Filter = require("bad-words");

const rest = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);

var channel = rest.channels.get("news-list");

export default async function handler(req, res) {
  const filter = new Filter();
  const cleanText = filter.clean(req.body.text);

  if (req.method === "POST") {
    channel.publish("new-headline", {
      text: cleanText,
      author: req.body.author,
    });

    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}
