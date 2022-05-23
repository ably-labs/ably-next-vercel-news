export default async function handler(req, res) {
  const url = decodeURIComponent(req.query.url);
  const result = await fetch(url);
  const body = result.body;
  body.pipe(res);
}
