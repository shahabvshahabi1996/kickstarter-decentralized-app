# Kickstarter Decentralized App
this is a copy of Real [Kickstarter](https://www.kickstarter.com/) web app built with `nodejs (express)`, `reactjs` and `mongodb` and :heart: on the **Rinkeby Ethereum Test Network**

## Features
- [x] You can Start Your Campaign and Ask for **Ethereum Donation** 
- [x] You can do authenication on this web app!
- [x] You can write about your campaign All in **Markdown**
- [x] You can like/dislike and report any campaign!!!
- [x] You interact with your [Meta Mask Wallet](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
- [x] The Smart Contract Written in Solidity and tested with `mocha` and [`remix IDE`](http://remix.ethereum.org)   
- [x] Handeling front-end routing with [Nextjs](https://github.com/zeit/next.js/) 
- [x] Every Thing is free and cool :smile:

## app structure :file_folder:

```
--- build // the compiled version of the campaign and you can deploy it on your blockchain!
--- contarcts // the contract that wrotes in solidity
--- pages // the pages that handles by react and next.js
--- server // the server directory (back-end)
--- test // all the test files!!!
--- campaign.js 
--- compile.js // the compile script 
--- deploy.js // the deploy script for deploying on rinkeby test network
--- factory.js 
--- routes.js // routes that handles by nextjs
--- server.js // the server script for nextjs
--- web3.js // connection between web3 and infura provider
--- package.json // your package.json
``` 

## how to use it ? :confused:
#### Server (Nodejs - back-end)
> for running your back-end after installing `node_module` via command `npm install` simply run `npm run sever` and then go to the http://localhost:8000/

#### Server (Nextjs - front-end)
> for running your front-end after installing `node_module` and after running your **Nodejs Server** via command `npm install` simply run `npm run dev` and then go to the http://localhost:3000/

#### Compiling 
> for compiling your contract after installing `node_module` simply run `npm run compile`

#### Deploying on Rinkeby Test Network 
> for deploying your contract after installing `node_module` and compiling simply run `npm run deploy`

#### Test
> for running test methods after installing `node_module` via command `npm install` simply run `mocha` and you can see the test result right in your console!


## Demo :smile: :sunglasses: :stuck_out_tongue:
for Working With Demo You Can Click On Link Below and **Do Not Forget** to give me :star2: :star2: :star2: :star2:  
[Check Out Demo! :smile:](https://kickstarter-next-app.herokuapp.com/)





