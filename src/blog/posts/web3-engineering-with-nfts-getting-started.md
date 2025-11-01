---
slug: web3-engineering-with-nfts-getting-started
primary_image: https://assets.stashfive.com/images/web3-engineering-with-nfts-getting-started/full.jpeg
summary_banner: https://assets.stashfive.com/images/web3-engineering-with-nfts-getting-started/slice.jpeg
tags: []
title: "Getting Started Building NFT Contracts"
date: 2022-07-14
summary_text: "Develop, test and deploy upgradeable NFT contracts using OpenZeppelin ERC721, Hardhat tooling, and learn from real-world NFT projects on Polygon."
image_credit: <a href="https://unsplash.com/@distinctmind">@distinctmind</a>
layout: layouts/post.liquid
---

NFTs are a big topic and there are many ways to learn about them.

Here's an overview of NFTs, plus resources for getting started with NFT development on Ethereum, Polygon and other EVM blockchains.

> **A [video is available](../nft-web3-kickstart-show/) from my interview on the "Web3 Kickoff Show" which includes an NFT overview, a Q&A session, and an introduction to NFT engineering topics discussed in this post.**

In this post I'll give:

- an overview of how I got started
- a quick definition of what NFTs are
- walk-through a starter NFT template for deploying to Ethereum or Polygon
- pointer to code for two real-world NFT projects I participated in with the Developer DAO

### How I got started: NFT as gateway drug to Web3 engineering

An NFT was my first serious introduction to Web3 and it kicked off pursuing Web3 full-time.

I was attending a CascadiaJS 2021 [workshop](https://2021.cascadiajs.com/workshops/dapps) in November about adding a web UI to a smart contract in Solidity. I knew the front-end well, but what's a smart contract and Solidity? And there happened to be some members of Developer DAO attending/presenting at the conference. What's the Developer DAO?

> **If you want to join or learn more about Developer DAO**, which a great organization for networking and building Web3 projects: [What is Developer DAO?](https://blog.developerdao.com/what-is-developer-dao)

After much searching around, I was able to discover the need to acquire an NFT for admission to the Developer DAO and access to its Discord. These [Devs for Revolution](https://opensea.io/collection/devs-for-revolution) NFTs were SVGs that only showed a list of key/value attributes (not the actual image) and there was a separate [website for previewing](https://pixel-devs.developerdao.com/) what these NFTs would visually look like.

It turned out a month or two later, I would decide to join the Derivatives team who were building the actual visual versions of these NFTs. "Pixel Devs" would be my first official Web3 project. More info below.

### What is an NFT?

"Fungibility is the ability of a good or asset to be readily interchanged for another of like kind. Like goods and assets that are not interchangeable, such as owned cars and houses, are non-fungible." ([Definition of Fungibility](https://www.investopedia.com/terms/f/fungibility.asp))

A non-fungible token (NFT) is similar to a collector's item, or a ticket for a seat at an event, or even a car - it's a unique way of identifying "ownership" of a specific item that are not easily interchangeable. A dollar bill is an example of the opposite (a fungible token) which can easily be exchanged for other dollar bills.

Having an NFT on the blockchain provides public proof of ownership, which can then lead to interesting digital experiences such as gating access to a community (as mentioned in the case of joining the Developer DAO), or owning a collectible that you can also sell/trade.

### What are some interesting uses for NFTs?

- Fun and Utility
  - Collect free POAPs (pronounced "poe app" as mentioned in [POAP guide](https://ryps.co/poap/)) which are free digital badges you collect for activities you've attended. POAPs means "Proof of Attendance Protocol". [Read more here](https://poap.xyz). You can also mint your own to give out for your next conference or event, and could offer special experiences for those holding a POAP for your event.
  - Gaming -- earn NFTs, or buy assets you own that you can use/trade/sell/buy. An insightful read: [Make NFTs a Gaming Tool Instead of a Sales Hustle](https://thedefiant.io/nfts-games-tools/)
  - Funding your next creative project
  - Organizations offering special experiences or promotions for holders of NFTs
  - Reward for completing an educational course

- Collectibles
  - Support your favorite artists, creator or project
  - Investing (for NFT mints with a limited number of items, which creates scarcity)

### What is a Smart Contract?

Smart Contracts are the code you write and deploy to a blockchain.

I started developing contracts on the Polygon blockchain, which is faster and less expensive than Ethereum, but uses the same Solidity Smart Contract tech. There are many other blockchains that support Solidity contracts.

I'll refer to the family of blockchains that run the Ethereum Virtual Machine (which runs Solidity code) as EVM.

### How do NFT contracts work behind-the-scenes?

Now that you know what an NFT is and what a Smart Contract is, let's walk through putting these concepts together.

> ---
>
> **Before jumping into code, note that NFTs can be created without writing code as well!**
>
> I'm an engineer, so I'm interested in learning about and creating smart contracts on say Ethereum or Polygon.
>
> Here are just a few non-coding options for creating NFTs:
>
> - a marketplace like OpenSea (for minting on Ethereum, Polygon and a growing set of blockchains). See [Create](https://opensea.io/asset/create).
> - a marketplace like Tezos' objkt. See [How to mint your first Tezos NFT on objkt.com](https://mirror.xyz/varras.eth/gZB57vyXSjRqx7OStVniOXa2c-RiAZrUIR-QgUt4LRA).
> - via tools to generate and publish NFTs. For example on Solana, NFTs are created via a centralized program and ecosystem called Metaplex. See [Creators](https://www.metaplex.com/learn-creators) section.
>
> ---

**Ok, jumping into code now!**

- each NFT collection has its own smart contract
- **walk through** the [ERC721 NFT standard](https://docs.openzeppelin.com/contracts/4.x/erc721) that the contracts are based on. This standard defines methods to mint, manage, and retrieve information about NFT ownership and metadata. Marketplaces also use this information to display NFTs.

Let's **walk through** my [smart contract starter template](https://github.com/briangershon/openzeppelin-erc721-upgradeable) which:

- starts with an [OpenZeppelin](https://www.openzeppelin.com/contracts) based contract. These contracts have been audited for security and best practices, and have a lot of features and documentation.
- offers an Upgradeable contract for flexibility
- demos methods for changing mint price or metadata (rather than hardcode them)
- discusses the importance of testing the contract via automated tests, and console interactions
- explains how to deploy

### PixelDevs

![PixelDevs image](https://pixel-devs.developerdao.com/meta.png)

Read more about the project here at [Launching Pixel Devs NFT on Polygon](https://blog.developerdao.com/launching-pixel-devs-nft-on-polygon).

The source code is available at [github.com/Developer-DAO/pixel-avatars](https://github.com/Developer-DAO/pixel-avatars). See the (collection on [OpenSea](https://opensea.io/collection/pixel-devs)) Note that minting these requires you own a [Devs for Revolution](https://opensea.io/collection/devs-for-revolution) NFT, which is the NFT for joining the Developer DAO.

This is good example of an Upgradeable contract, and as mentioned in the blog post, an innovative way to call Web3 services with the flexibility of using a Web2 server. In this case, it's to validate NFT ownership on Etherum to then mint on Polygon.

This is also an example of connecting the web UI to the smart contract.

Deployment and testing is also documented.

### Developer DAO for Ukraine (Donation site)

![Developer DAO for Ukraine image](https://ukraine.developerdao.com/meta.png)

Read more about the project here at [Developer DAO for Ukraine](https://blog.developerdao.com/developer-dao-for-ukraine-1). The source code is available at [github.com/Developer-DAO/ukraine-donation-nft](https://github.com/Developer-DAO/ukraine-donation-nft).

This is a good example of the power of [Access Control and Roles](https://docs.openzeppelin.com/contracts/2.x/access-control) as well as metadata needed to support OpenSea, and setting up Royalties. This is also an example of tiered-based pricing - six different types of NFTs, each with its own price point and image.

This is also an example of connecting the web UI to the smart contract.

Deployment and testing is also documented.

### In Closing

There is a lot to learn about Web3, which is a challenge, but also an opportunity to experiment and shape the technologies and projects coming tomorrow.

### Appendix A: Additional Resources

- Learn about EVM-based (like Ethereum or Polygon) smart contracts, and use vetted code for many of the popular features you want, by exploring [OpenZeppelin Contracts](https://www.openzeppelin.com/contracts).
- Join Developer DAO for opportunities to build with Web3, including upcoming projects like _School of Code_
  - What is Developer DAO? How do I join? What are some of the active projects? [Read this post](https://blog.developerdao.com/what-is-developer-dao)
  - Peruse the many posts on the [blog](https://blog.developerdao.com/) such as [What is Web 3.0: A Layman's Guide to the Decentralized Web](https://blog.developerdao.com/what-is-web-30-a-laymans-guide-to-the-decentralized-web)
  - There's also a [weekly newsletter](https://developerdao.substack.com/)
- Web3 courses on Udemy and Podcasts: [Exploring Smart Contracts](../exploring-smart-contracts/)
- There are many other sites, such as [buildspace](https://buildspace.so/).
- Learn about popular collections by visiting a gallery such as the [Seattle NFT Museum](https://www.seattlenftmuseum.com/), which also has a Disord community.

### Appendix B: Ethereum-based NFT Projects

Here are some Ethereum NFT projects I found interesting.

- **Surge Women** - "Securing women’s place in Web3. Surge is a global community educating, learning, and building a decentralized future together." A nice example of NFTs that act as a collectible art piece as well as offering utility in the form of "[perks](https://perks.surgewomen.io/)" for those who own an NFT. (See collection on [OpenSea](https://opensea.io/collection/surge-passport))(Visit their [Website](https://www.surgewomen.io/))
- **Electric Coffin's Unios Project** - Local Seattle artists experimenting with their first NFT project. "Unios is a generative NFT collection of 2,500 original hand painted 1 of 1 artwork by Electric Coffin that supports rewilding efforts with physical art installations built by local communities and conservation partners." (See collection on [OpenSea](https://opensea.io/collection/unios)) (See my ["Future Machine Vol 4" Exhibit Opens in Seattle](https://www.briangershon.com/blog/electric-coffin-future-machine-vol-4-exhibit-seattle/) post)
- **Meta Angels** -- "A collection of 10,000 unique Meta Angels, generated from more than 400 hand drawn elements" (See collection on [OpenSea](https://opensea.io/collection/metaangelsnft)) (Visit their [Website](https://www.metaangelsnft.com/))
