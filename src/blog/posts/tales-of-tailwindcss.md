---
slug: tales-of-tailwindcss
primary_image: https://assets.stashfive.com/images/tales-of-tailwindcss/full.jpeg
summary_banner: https://assets.stashfive.com/images/tales-of-tailwindcss/slice.jpeg
tags: []
title: "Tales of Tailwind CSS"
date: 2022-11-09
summary_text: "Why I changed my mind about Tailwind CSS and now love it for styling web apps. Plus introduction to component frameworks like DaisyUI and Tailwind UI."
image_credit: <a href="https://unsplash.com/@temet">Cristobal Baeza</a>
draft: false
layout: layouts/post.liquid
---

## Overview

What is Tailwind CSS?

**An API for your design system.**

"Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system."

## Why you may not like it

I had heard a lot about Tailwind CSS and decided to give it a try on a new project.

After an hour I ended up ripping it out because:

- I was worried this will dull my knowledge and practice of CSS ("why learn fake CSS shortcuts instead of css directly?")
- cryptic-looking list of class names looked ugly

Example Tailwind styling:

```
relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500
```

Also a framework of utility classes still require you to understand CSS concepts, which is good or bad depending on what you're looking for.

If you like the flexibility of directly wielding CSS (but with nice utility classes), continue on.

## What finally sold it for me

- HTML and styles go hand-in-hand, you don't have one without the other.
  - Easier to maintain one structure rather than maintaing two structures and connect them with semantic names.
  - It's true the CSS-in-JS approach also co-mingles HTML and styles, though with Tailwind there's no gymnastics of passing groups of styles in via a JavaScript object.

- Utilities make life easier
  - shortcuts for common patterns like flexbox and grids, media queries, pseudo classes like hover.
  - these utilties map to CSS and you can peruse via the VSCode extension.

- When using tailwind-based frameworks you leverage same concepts and utilities

- Small CSS bundles

- Ultimately I was able to style good looking functional sites quickly!

## Get a taste

Here we'll do a quick walk-through.

**This walk-through was performed live** as a lightning talk at [SeattleJS](https://seattlejs.com/) and not detailed in this post. Please visit [tailwindcss.com](https://tailwindcss.com/) and the component libraries mentioned below for more info.

1. Let's play in a Next.js site. To create one quickly clone [briangershon/nextjs-starter](https://github.com/briangershon/nextjs-starter) which has React, Tailwind and DaisyUI setup and ready-to-go.

2. We'll use VSCode with the "Tailwind CSS IntelliSense" extension.

3. We'll create a flex
4. Lastly, we'll grab DaisyUI and TailwindUI components and try those (see below).

## I'd like some components please

Here are some swanky options:

1. [DaisyUI](https://daisyui.com/) - set of components, theming support. There are many themes, including `Wireframe` which is useful when initially laying out a site.

2. [Tailwind UI](https://tailwindui.com/) - paid professional components build by the Tailwind team. These components also lean on Headless UI for transitions, as well as [heroicons](https://heroicons.com/) for icons.

3. [Headless UI](https://headlessui.com/) - unstyled components and transition library.

And you customize all these Tailwind-based frameworks the same way so can mix and mingle them, plus don't need to learn a new paradigm each time.

## Tips and Resources

- For components that are heavily styled, if you're unhappy with long strings of Tailwind utilities:
  - create components to encapsulate. For example, move a heavily styled button into its own component to reuse.
  - another option is creating your own Tailwind utilities, though read [Avoid Premature Abstraction](https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction) first.

- On the Tailwind site you can find:
  - great documentation
  - a fancy walk-through of Tailwind on the home page of [tailwindcss.com](https://tailwindcss.com/)
