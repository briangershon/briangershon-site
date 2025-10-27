---
slug: exploring-smart-contracts
primary_image: https://assets.stashfive.com/images/exploring-smart-contracts/full.jpeg
summary_banner: https://assets.stashfive.com/images/exploring-smart-contracts/slice.jpeg
tags: []
title: Exploring Smart Contracts
date: 2022-01-01
summary_text: "Build a new generation of apps based on the blockchain and Smart Contracts. These tools can help you fund your projects, support your favorite creators, build games with real economies, and find new models for distributed ownership and governance."
image_credit: <a href="https://unsplash.com/@raimondklavins">Raimond Klavins</a>
layout: layouts/post.liquid
---


Smart Contracts allow you to build apps that support new ways of funding projects, building economies, governing organizations, gaming, creating unique digital experiences with your favorite creators, or building those experiences for your own creations.

For example, Axie Infinity is a "play to earn" game that uses the digital economy to generate real wealth for players. It's not just a traditional in-game virtual economy, it's a real $3 billion economy owned by players. In the Philippines it's [replacing low paying work](https://restofworld.org/2021/axie-infinity/). This [interview](https://www.joincolossus.com/episodes/43695570/larsen-sky-mavis-the-builders-behind-axie-infinity) with the game founders is fascinating in the scale of what's been accomplished and the roadmap ahead.

## A few definitions

<dl>
  <dt>Blockchain</dt>
  <dd>A system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system. A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain. (<a href="https://www.euromoney.com/learning/blockchain-explained/what-is-blockchain" rel="noopener noreferrer" target="_blank">Euromoney</a>)</dd>

  <dt>Smart Contract</dt>
  <dd>A self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code. The code and the agreements contained therein exist across a distributed, decentralized blockchain network. (<a href="https://www.investopedia.com/terms/s/smart-contracts.asp" rel="noopener noreferrer" target="_blank">Investopedia</a>)</dd>

  <dt>Ethereum Virtual Machine (EVM)</dt>
  <dd>The role of EVM is to execute and deploy smart contract which are written in programming languages like Solidity.</dd>
</dl>

## Which blockchain to use?

The blockchain you pick for your Smart Contract application depends on several factors:

- the type of app you're building
- scalability - the number of transactions per second and price of transactions)
- popularity of platform

There are also real-world energy usage differences between older and newer systems.

For example, high-end collectibles are often built on Ethereum 1.0 due to the popularity of the Ethereum ecosystem which was the first blockchain to offer Smart Contracts. On the downside, it has high transaction costs and is relatively slow. It's also very energy intensive since it's based on the Proof of Work consensus system.

What if you're building a high-transaction system that needs very low transaction costs? There are a range of blockchains that support these types of scenarios. These systems tend to use the newer Proof of Stake consensus model which uses much less energy and adds scalability. Ethereum 2.0 will be based on Proof of Stake to gain these benefits as well.

Go deeper: <a href="https://www.coinbase.com/learn/crypto-basics/what-is-proof-of-work-or-proof-of-stake" rel="noopener noreferrer" target="_blank">What is Proof of Work or Proof of Stake?</a>

## Developing Smart Contracts

Contracts are software programs used to manage valuables like currency or organizational governance so it's critical to understanding best practices around development, testing and security.

There are many Smart Contract systems now. Here I'll focus on contracts that run on the Ethereum Virtual Machine (EVM).

There are <a href="https://evmarts.medium.com/evm-blockchains-dff609f8d27a" rel="noopener noreferrer" target="_blank">many popular blockchains that support EVM-based contracts</a>.

### Best Practices

I recommend getting started with OpenZeppelin's learning materials and their ecosystem of existing well-tested contracts.

I created an [open source template for starting OpenZeppelin-based projects](https://github.com/briangershon/openzeppelin-solidity-hardhat-playground). It's based on their tutorial plus then I added some additional features:

- wrote tests in [Hardhat](https://hardhat.org/), which is an Ethereum development environment. Their tutorial does cover Hardhat, but not for the testing piece.
- deploying to the [Polygon](https://polygon.technology/) blockchain instead of Ethereum. Polygon has lower transaction fees and is less energy-intensive.

### Learning Solidity

You will also want to study Solidity and learn how to build some popular contracts from scratch.

I enjoyed the [Master Ethereum & Solidity Programming From Scratch in 2022](https://www.udemy.com/share/101HJ83@G8z3AgIKDo4fLzyDe-j7-pa_Uik9irXjW-aCJiDa2BJMv0YLDewpK_FVmExRrcLUVw==/) Udemy course which teaches Solidity and walks through building useful contracts such as Token, Initial Coin Offering, Lottery, Auction, Crowdfunding.

### Build a full-stack application

You'll also want to understand how to build a full-stack application.

I enjoyed the [Build An NFT Marketplace From Scratch - Blockchain DApp](https://www.udemy.com/share/105hyI3@9C6copfba99iFdbZc1Je9s-co-mAtSAMvsG6mlQ4oST71pQVtbvN83NQgLuRqug3kA==/) Udemy course which focused on creating a full-stack marketplace application minting non-fungible tokens, building the UI, and connecting the UI with the blockchain. Tools include NextJS and Ether.js for the front-end, and OpenZeppelin contracts and Hardhat for the Solidity environment.

## Podcasts

There is a lot to explore in cryptocurrency and Web3, such as tokenomics, developer ecosystems, and popular projects. Learn through a growing number of podcasts and online learning resources.

Here are some podcast episodes I really enjoyed:

- [Sky Mavis: The Builders behind Axie Infinity](https://www.joincolossus.com/episodes/43695570/larsen-sky-mavis-the-builders-behind-axie-infinity) (Colossus)
- [Vitalik Buterin: Ethereum 2.0](https://lexfridman.com/vitalik-buterin-2/) (Lex Fridman)
- [Metaverse, NFTs and Creator Economies](https://podcasts.apple.com/us/podcast/metaverse-nfts-and-creator-economies-with-jon-radoff/id1241195252?i=1000532128927) with Jon Radoff, CEO of Beamable (Deconstructor of Fun)
- [An NFT Conversation for Indie Hackers with Hiten Shah and Mubashar Iqbal](https://www.indiehackers.com/podcast/235_nft) (Indie Hackers)
- [DAOs 101: Creating, Scaling and Dissolving DAOs (Distributed Autonomous Organizations](https://limechain.tech/web3-podcast/) (Episode 3, Web3 with a Splash of Lime)

... and am working my way through episodes in these podcasts:

- Web3 Breakdowns <https://www.joincolossus.com/episodes>
- Zero Knowledge <https://zeroknowledge.fm/>
- Into the Ether <https://podcast.ethhub.io/>
- Bankless <http://podcast.banklesshq.com/>
- Epicenter.tv <https://epicenter.tv/>
- Unchained <https://unchainedpodcast.com/>
- Hustle and Flowchart - Web3 and the Creator Economy <https://hustleandflowchart.libsyn.com/>
- Web3 with a splash of lime <https://limechain.tech/web3-podcast/>
- Web3 with Sam Kamani <https://www.samkamani.com/>
- Fintech Insider Podcast by 11:FS <https://fi.11fs.com/>

## In Conclusion

It's challenging to get started building distributed apps with Smart Contracts mainly due to all the options, new technologies and fast growing ecosystem.

Though once you dive in, you'll be intrigued by the possibilities.
