/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["@ably-labs/react-hooks"]);
const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["static.ably.dev"],
  },
});

module.exports = nextConfig;
