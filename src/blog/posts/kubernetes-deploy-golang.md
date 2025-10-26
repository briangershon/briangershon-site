---
tags: []
title: Kubernetes Go module for Deploy Bots
date: 2018-10-05
description: An open source Go module for deploying images to Kubernetes and checking their status.
layout: layouts/post.liquid
---


While the Slack-based deploy bot I built is customized specifically for our own use, the Kubernetes API bits are useful for anyone who wants to create their own automation.

`kubernetes-deploy` is an open source Go module that calls Kubernetes API directly to update the image of an existing deployment and checks that new images are running successfully, and includes a sample command-line app to demonstrates its features.

<https://github.com/Unity-Technologies/kubernetes-deploy>
