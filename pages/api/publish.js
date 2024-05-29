import Ably from 'ably';
import urlExists from 'url-exists-nodejs';
import ogs from 'open-graph-scraper';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({});
    return;
  }

  if (typeof req.body?.text !== 'string') {
    res.status(400).json({ url: req.body?.text, message: 'not a valid URL' });
    return;
  }

  const validUrl = await urlExists(req.body.text);
  if (!validUrl) {
    res.status(400).json({ url: req.body.text, message: 'not a valid URL' });
    return;
  }

  const { result } = await ogs({ url: req.body.text });

  if (!result.success) {
    res.status(400).json({ message: 'not a valid URL' });
    return;
  }

  const ably = new Ably.Rest(process.env.ABLY_SERVER_API_KEY);
  const channel = ably.channels.get('headlines');

  await channel.publish('new-headline', {
    author: req.body.author,
    site: result?.ogSiteName || 'unknown',
    title: result?.ogTitle || 'unknown',
    desc: result?.ogDescription || 'unknown',
    image: result.ogImage?.url || '',
    url: req.body.text,
  });

  res.status(200).json({});
}
