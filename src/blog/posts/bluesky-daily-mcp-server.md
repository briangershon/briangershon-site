---
title: Building an MCP Server to Explore My Bluesky Feed
date: 2025-04-09
tags: []
description: The Bluesky Daily MCP Server was created to summarize posts from Bluesky follows, enabling exploration of daily content through a chat interface rather than just viewing a single daily summary.
layout: layouts/post.liquid
---


## Goal

My goal is to take a daily block of Bluesky posts from my follows, run it through an LLM, and get a summary of key topics across those posts.

Or really, my goal is to find interesting content, while avoiding endless scrolling through my feed, which happens when you have a lot of follows, or when you follow a lot of people who post a lot.

I created a prompt that focused on software development topics and also requested links to the original posts so I could visit them in Bluesky to explore further, like or repost them.

My first version was an internal app that would summarize posts each night and allow me to flip between days.

This was nice, but I immediately wanted to be able to explore the data and not just have a static summary.

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/bluesky-daily-app.png" alt="Bluesky Daily Application Screenshot" width="100%">

## How to explore your data without building your own chat?

I could build chat capability into my app, but instead decided a better approach would be to use an existing LLM and bring the data and prompts in there. This is what MCP Server was built for.

If you're new to "Model Context Protocol" check out [MCP Introduction](https://modelcontextprotocol.io/introduction).

Essentually an MCP Server is a simple web server that runs locally on your machine, and provides tools, prompts and resources to your MCP Client. (They can run in the cloud too, but that's another story)

Here are some popular clients:

- Claude Desktop -- the defacto, where is all began
- VS Code ([MCP Server for VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers))
- Cursor ([Cursor MCP Directory](https://cursor.directory/mcp)).
- OpenAI has adopted [MCP in their OpenAI agent framework](https://openai.github.io/openai-agents-python/mcp/).

There are thousands of MCP Servers available, and you can build your own.

## Bluesky Daily MCP Server

I built Bluesky Daily MCP Server to allow me to explore my Bluesky posts in a chat interface, specifically Claude Desktop.

Bluesky Daily MCP provides an LLM tool to retrieve posts for a specific day, and prompts for summarizing the posts.

## Installation

Source code and installation instructions are available at <https://github.com/briangershon/bluesky-daily-mcp>

## Walkthrough of Features

<p>1. Start a new chat in Claude Desktop, ask to retrieve Bluesky posts for a specific day:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-1.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>2. This triggers a tool in Bluesky Daily MCP Server to kick-off and asks permission to run. Claude has also converted date to `yyyymmdd` format expected by the tool:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-2.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>3. The tool runs and retrieves posts for the day, and returns its own quick summary of the posts:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-3.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>4. The user can now pick one of the prompts by clicking the connection icon below "Reply to Claude...". We're going to pick "Summarize Key Technical Topics":</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-4.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>5. User submits the prompt to Claude, and it returns the summary of the posts, with links to the original posts. If you click the "Summarize Key Technical Topics.txt" bubble, you see the actual prompt on the right:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-5.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>6. User can try another prompt, such as the "Create Mermaid Diagram" and see results on the right:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-6.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>7. User can also ask your own questions, such as "what's the DWeb science fair?":</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-7.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

<p>8. User can try another prompt, the "Summarize Authors' Posts" and see results on the right:</p>

<img src="https://assets.stashfive.com/images/bluesky-daily-mcp-server/walkthru-8.png" alt="Screenshot using Bluesky MCP Server within Claude Desktop" width="100%">

## Building the MCP Server

You can build a MCP server in any language, I choose TypeScript.

In the TypeScript SDK, I started with their higher-level `MCPServer` class implementation but ended up porting this to their lower-level `Server` class implementation, which gives you more control over the server.

I made the switch to play with `notification/progress` for longer-running API requests for data, though eventually discovered that Claude Desktop didn't support them -- so making the switch may have been unncessary for being able to send those notifications.

### More on Long-running Requests

Here's a reminder that MCP is still very new -- the spec is evolving -- and clients may or may not support all the features.

Most third-party APIs you'll be calling via MCP Server are relatively fast, but in my case I request daily posts live, so it may take more than 60 seconds to retrieve from the Bluesky APIs. My MCP Server caches them, but that initial request for a specific day may take a while.

My first attempt was to model the request for posts as an MCP `resource` which makes sense, but for long-requests the Claude Desktop UI didn't show any progress in the UI, and the request timed out. Claude Desktop has a 60 second default timeout.

The spec mentions `notification/progress` you can send to the client, but it wasn't working for me.

Claude Desktop code is not open-source so I couldn't confirm by looking at the code how to notify users while long-running requests ran.

Ultimately through (hours of) experimentation I discovered that the Claude Desktop client doesn't support progress notifications for `resources` nor `tools`.

The solution was to do this in two parts:

1. To workaround timeouts, when you configure the MCP Server, you can lengthen the timeout using the `REQUEST_TIMEOUT_MS` configuration, so `120000` is 2 minutes. This gave me more breathing room.
2. To then show a spinner and progress in the UI, you need to create a `tool` instead of a `resource`. Claude automatically shows a spinner while the tool runs.

> Resources still seem like the right way to go for retrieving posts, but would require Claude Desktop to support `notification/progress` messages.

## `bsky-tldr` NPM Package

I also used the `bsky-tldr` NPM package that I created to make it easy to retrieve posts from Bluesky and return a focused set of data for LLMs, and partition for a specific 24 hour period.

Available at <https://www.npmjs.com/package/bsky-tldr>
