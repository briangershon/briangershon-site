---
slug: caddy-your-serverless-functions
primary_image: https://assets.stashfive.com/images/caddy-your-serverless-functions/full.jpeg
summary_banner: https://assets.stashfive.com/images/caddy-your-serverless-functions/slice.jpeg
tags: []
title: Caddy your Serverless Functions
date: 2020-10-03
summary_text: Use Caddy to bring your serverless functions under one roof, with a custom domain and automatic HTTPS.
image_credit: '<a href="https://unsplash.com/@rdehamer">Ryan De Hamer</a>'
layout: layouts/post.liquid
---


Use Caddy to bring your serverless functions under one "custom domain" roof, with automatic HTTPS.

## Why host your own API gateway?

First a public service announcement:

<blockquote>Each of the major cloud providers have an API management service that works well with their functions-as-a-service product. You may prefer to use that instead of hosting your own server.</blockquote>

For my personal project I wanted to:

- bring together my cloud functions under a custom domain, rather than expose cloud function endpoints separately
- roll my own gateway on a [Digital Ocean](https://m.do.co/c/719f812c82c6) droplet, using Docker, Docker Compose and Caddy. I enjoy the engineering journey and flexibility this combination offers
- have automatic HTTPS support
- keep it simple since I'm hosting it myself

## Configuring Caddy v2

Caddy is an open source web server that offers a streamlined configuration for automatic HTTPS (by handling the certificate renewal for you) and reverse proxying.

This configuration example shows how to hide `https://us-central1-abc123.cloudfunctions.net/myCloudFunction` beyond a custom domain and expose the function at `https://myfunction.mydomain.com/add`

```
https://myfunction.mydomain.com {
  tls myemail@gmail.com
  handle_path /add* {
    rewrite * /myCloudFunction{uri}
    reverse_proxy {
      header_up Host "us-central1-abc123.cloudfunctions.net"
      to https://us-central1-abc123.cloudfunctions.net
    }
  }
  log {
    output file /logs/myfunction.mydomain.com.log
   }
}
```

Here are the highlights:

- `tls` configures automatic HTTPS for `https://myfunction.mydomain.com`
- `handle_path` handles the "/add" route and then rewrites the url by stripping the incoming "/add" and then `rewrite` add the cloud function name
- `reverse-proxy` forwards the request to the newly formed URL and returns the results
- the `Host` header is required so the cloud provider (Google Cloud in this case) knows where to find the function. It avoids _"The requested URL /myCloudFunction/ was not found on this server"_ error.

## If you're currently using an older version of Caddy (v1)

Caddy v2 was released in May 2020 and I recently went through the exercise of upgrading my Caddy v1 configuration and ran into a couple of challenges:

- There weren't easy-to-find examples for the scenario I was interested in, so after playing for awhile I [reached out to the Caddy team](https://github.com/caddyserver/caddy/issues/3773) to help me convert the one-line `proxy` directive in v1 to a combination of `reverse-proxy`, `handle_path` and `rewrite` in v2.

- That got me closer, though Google Cloud was still returning a 404 for `myCloudFunction`. After researching SNI and hints around the internet, the key was adding `header_up Host "us-central1-abc123.cloudfunctions.net"` to avoid _"The requested URL /myCloudFunction/ was not found on this server"_ error.

For reference, here was my original configuration from Caddy v1's:

```
https://myfunction.mydomain.com {
  tls myemail@gmail.com
  proxy /add https://us-central1-abc123.cloudfunctions.net/myCloudFunction
  errors /log/myfunction.mydomain.com.errors.log
  log / /log/myfunction.mydomain.com.log "{combined}" {
    rotate_size 100
    rotate_keep 10
  }
}
```

## Wrapping up

As an engineer, hosting your own server with open source technology is a great way to stay sharp and learn about what's happening behind-the-scenes.