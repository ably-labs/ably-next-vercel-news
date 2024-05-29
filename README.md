# Build a Social Link-Sharing App with Ably, NextJS, and OpenGraph

Live example at: <https://ably-next-headlines.vercel.app/>

Step by step guide at: <https://ably.com/blog/next-js-vercel-link-sharing-serverless-websockets>

This is a demo app using [NextJS](https://nextjs.org/) and [Ably](https://ably.com) with the [Ably](https://www.npmjs.com/package/ably) `npm` module.

## Description

It demonstrates the use of:

- Pub/sub messaging
- Channel presence
- Channel rewind/History
- OpenGraph

It shows how to use Ably's React Hooks in the context of a Next.js application, with server-side rendering.

## Tech stack

The project uses the following components:

- [NextJS](https://nextjs.org/), for highly optimized static web sites
- [Vercel](https://vercel.com/), for deployment
- [Ably](https://www.npmjs.com/package/ably), for realtime messaging at scale in React-based applications.

## Building & running locally

### Prerequisites

1. [Sign up](https://ably.com/signup) or [log in](https://ably.com/login) to ably.com, and [create a new app and copy the root API key](https://faqs.ably.com/setting-up-and-managing-api-keys). This is your server API key.
2. Create another API key with the Subscribe abd Presence capabilities only. This is your client API key.
3. Run `npm install`.

### Building the project

To run this project locally, fork this repo and add an `.env` file containing your Ably API keys and local path:

```sh
# This will change after deployment
NEXT_PUBLIC_HOSTNAME=http://localhost:3000
# Server key must have Publish and History permissions - use app's Root key
ABLY_SERVER_API_KEY=UGCYxQ.211oIA:VgSya3hCMo....
# Client key should have Subscribe and Presence permissions only
ABLY_CLIENT_API_KEY=UGCYxQ.uhSg9Q:A6Ftr7F0HTg....
```

## Deploying to the cloud

Refer to the [tutorial blog post](https://ably.com/blog/next-js-vercel-link-sharing-serverless-websockets#step-13-deploy-your-app-to-vercel) for full instructions on deployment to Vercel.

## Contributing

Want to help contributing to this project? Have a look at our [contributing guide](CONTRIBUTING.md)!

## More info

- [Join our Discord server](https://discord.gg/q89gDHZcBK)
- [Follow us on Twitter](https://twitter.com/ablyrealtime)
- [Use our SDKs](https://github.com/ably/)
- [Visit our website](https://ably.com)

---
[![Ably logo](https://static.ably.dev/badge-black.svg?ably-next-vercel-news)](https://ably.com)
