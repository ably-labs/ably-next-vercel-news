import Ably from "ably/promises";
import urlExists from "url-exists-nodejs";
import ogs from "open-graph-scraper";

const rest = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);

var channel = rest.channels.get("headlines");

export default async function handler(req, res) {
  const validUrl = await urlExists(req.body.text);
  if (!validUrl) {
    res.status(400).json({
      url: req.body.text,
      message: "not a valid URL",
    });
    return;
  }
  let url = req.body.text;
  let siteTitle,
    siteName,
    siteDescription,
    siteImage = "";
  const { error, result, response } = await ogs({ url });
  console.log(result);
  if (result.success) {
    siteTitle = result.ogTitle;
    siteName = result.ogSiteName;
    siteDescription = result.ogDescription;
    siteImage = result.ogImage.url;
  } else {
    siteTitle = res.status(400).json({ message: "not a valid URL" });
  }

  if (req.method === "POST") {
    channel.publish("new-headline", {
      site: siteName,
      title: siteTitle,
      desc: siteDescription,
      url: url,
      image: siteImage,
      author: req.body.author,
    });

    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}
