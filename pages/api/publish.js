const Ably = require("ably");

const rest = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);

var channel = rest.channels.get("news-list");

export default async function handler(req, res) {
  if (req.method === "POST") {
    channel.publish("new-headline", {
      text: req.body.text,
      author: req.body.author,
    });

    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}
