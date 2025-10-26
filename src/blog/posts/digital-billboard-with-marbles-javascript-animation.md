---
tags: []
title: Digital Marbles
date: 2018-11-04
description: A digital billboard sign made from falling marbles.
layout: layouts/post.liquid
---


It's great fun to build a site from scratch.

In this case I wanted to play with animation and physics, and create a billboard from bouncing marbles.

To try it out, visit <https://marbles.briangershon.com>, add your own billboard message, then click `Animate`.

## How was it built?

Vanilla JavaScript using ES6 and ES7 (async/await).

To minimize build tool complexity, I like [Parcel](https://parceljs.org/) and its near zero configuration. This way I can use the latest JavaScript, pull my ES6 modules together, run them through Babel for cross-browser compatibility, and finally generate a nice minified distribution. It even supports hot reloading. Parcel (1.10+) now supports Babel 7.

For testing, I've been using Jest.

I originally thought I'd pull an off-the-shelf JavaScript physics engine to use, but it was more than this project needed (and didn't quite work correctly stacking marbles) so I created my own marble-bouncing-and-stacking engine.
