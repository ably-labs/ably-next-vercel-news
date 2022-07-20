# Build a Social Link-Sharing App with Ably, NextJS, and OpenGraph

This is a demo app using [NextJS](https://nextjs.org/) and [Ably](https://ably.com) with the Ably's [react-hooks](https://github.com/ably-labs/react-hooks) `npm` module.

You can test it out by visiting the [live deployment](https://ably-next-headlines-live.vercel.app/) in multiple tabs.

## Description

It demonstrates use of:

- Pub/sub messaging
- Channel presence
- Channel rewind/History
- OpenGraph

It show how to use Ably's React Hooks in the content of a Next.js application, with server-side rendering.

## Tech stack


The project uses the following components:

- [NextJS](https://nextjs.org/), for highly optimized static web sites
- [Vercel](https://vercel.com/), for deployment
- [Ably React Hooks](https://www.npmjs.com/package/@ably-labs/react-hooks), for realtime messaging at scale in React-based applications.

## Building & running locally

### Prerequisites

1. [Sign up](https://ably.com/signup) or [log in](https://ably.com/login) to ably.com, and [create a new app and copy the root API key](https://faqs.ably.com/setting-up-and-managing-api-keys). This is your server API key
2. Create another API key with the Subscribe abd Presence capabilities only. This is your client API key.
2. Run `npm install`

### Building the project

To run this project locally, fork this repo and add an `.env` file containing your Ably API keys and local path:

```
# This will change after deployment
NEXT_PUBLIC_HOSTNAME=http://localhost:3000
# Server key must have Publish and History permissions - use app's Root key
ABLY_SERVER_API_KEY=UGCYxQ.211oIA:VgSya3hCMo....
# Client key should have Subscribe and Presence permissions only
ABLY_CLIENT_API_KEY=UGCYxQ.uhSg9Q:A6Ftr7F0HTg....
```

## Deploying to the cloud

Refer to the tutorial blog post for full instructions on deployment to Vercel.

## Contributing

Want to help contributing to this project? Have a look at our [contributing guide](CONTRIBUTING.md)!

## More info

- [Join our Discord server](https://discord.gg/q89gDHZcBK)
- [Follow us on Twitter](https://twitter.com/ablyrealtime)
- [Use our SDKs](https://github.com/ably/)
- [Visit our website](https://ably.com)

---
[![Ably logo](https://static.ably.dev/badge-black.svg?ably-next-vercel-news)](https://ably.com)
