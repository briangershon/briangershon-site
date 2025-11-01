---
slug: developing-real-time-games-with-cloudflare-durable-objects-and-websockets
primary_image: https://assets.stashfive.com/images/developing-real-time-games-with-cloudflare-durable-objects-and-websockets/full.jpeg
summary_banner: https://assets.stashfive.com/images/developing-real-time-games-with-cloudflare-durable-objects-and-websockets/slice.jpeg
tags: []
title: Real-time Games with Cloudflare Durable Objects
date: 2021-12-09
summary_text: "What would a scalable game server look like on serverless? I kicked the Cloudflare tires and built an open source Planning Poker app to find out."
image_credit: <a href="https://unsplash.com/@kirklai">𝓴𝓘𝓡𝓚 𝕝𝔸𝕀</a>
layout: layouts/post.liquid
---

What would a scalable [serverless](https://www.cloudflare.com/learning/serverless/what-is-serverless/)-style game server look like?

I would expect it to:

- spin up when you need it, spin down when you don't
- hold the source-of-truth for a game instance and its player state
- persist game state (durability)
- connect with clients over websockets
- support low latency by running nearby on the edge
- not have cold starts

Cloudflare Workers and Durable Objects provide these capabilities.

Next up is a quick introduction to Durable Objects, as well as an introduction to the open-source Planning Poker app build on these technologies.

## What are Cloudflare Durable Objects?

In a traditional cloud-based app, you'd separate compute and storage. You'd run a stateless serverless function, or a long-lived container, and then read/write state data in a central database on each request.

**These [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects) are a way to bring together distributed data (regardless of where on the network edge this is happening) into one place where it can be viewed or updated in real-time, as well as persisted.** And it's easy to have a Durable Object represent a game instance.

You also never need to manage the lifecycle of the Durable Object directly. You just try to communicate with a stub (passing in a unique ID) and it will instantiate itself, or if already running will accept traffic, or if no longer receiving any traffic it will spin down.

## Building a Planning Poker Web App on Cloudflare

My goals were to build a real-time multiplayer application using websockets, as well as learn about the Cloudflare platform which seemed well suited for this type of application.

I chose to create an open-source planning poker app. Each game consists of a feature/story that needed estimating as well as a team of players participating in the real-time voting. When all votes are in, the game ends and the results are revealed.

The site lives at <https://planningpoker.games> and the source code is at [github.com/briangershon/planning-poker](https://github.com/briangershon/planning-poker).

![Screenshot of a Planning Poker game in progress where one player had voted their estimated t-shirt size](https://assets.stashfive.com/images/developing-real-time-games-with-cloudflare-durable-objects-and-websockets/other-player-sees-green.png)

Some more details:

- The React front-end was hosted on Cloudflare Pages.

- The back-end uses Cloudflare Workers, KV and Durable Objects.

- Game state was persisted in the Durable Object, as well as all of the active websocket connections for that game instance. Each game had its own Durable Object.

- The source code has a complete working example using Cloudflare Workers, Workers KV, Durable Objects, Websockets, and Cloudflare Pages. The front-end uses React, Redux Toolkit, TypeScript and Snowpack. Authentication via Github OAuth.

## Some Durable Object learnings along the way:

- My initial thought was to treat the Durable Object as purely a singleton data container and do more logic in the Worker, but discovered that it's best to keep most of the logic in the Durable Object and then just pass the unaltered request directly from the Worker.
  - This was particularly important for adding websocket support -- just terminate the websocket connection inside the Durable Object.

  - If you try to do logic in both Worker and Durable Object, you have to marshal data back and forth and create extra code/boilerplate.

  - Also for non-trivial Durable Objects, you'll want to handle REST routing inside the Durable Object. To alleviate rolling your own router, I discovered the `itty-router` NPM package which is a router specifically for this purpose.

- The Cloudflare code examples often demonstrated rolling your own caching in Durable Object (by reading data into local variables upon instantiation) but ultimately I just removed that and performed the read/write directly from the key/value store as needed. For the small amount of game state I needed, this approach worked fine, plus Durable Objects provide some caching for you out-of-the-box. It's nice however to have the option to add your own caching of data if your application needs it.

- You need to somehow persist the ID for the Durable Object so you can find it again. For this app, I used Cloudflare KV storage to assign games to a specific user, so the Durable Object could be found again.

- Durable Objects can run in any region, though there may be cases you want them to only run in certain regions, say to comply with data protection laws. See [Jurisdictions](https://developers.cloudflare.com/workers/runtime-apis/durable-objects#restricting-objects-to-a-jurisdiction).

- There are many other interesting cases for Durable Objects, such as API rate-limiting, where you could create a Durable Object for every user to track their quota. Or you could use a Durable Object to save real-time stats or analytics.

## In conclusion

This was my first time using the Cloudflare platform, and I really enjoyed it. It has the features many apps need, and Durable Objects are an innovative and useful abstraction.
