const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs-extra');
const path = require('path')

const Campaign = require('./build/Campaign.json');
const CampaignFactory = require('./build/CampaignFactory.json');

var provider = new HDWalletProvider(
    'energy damp enlist panic transfer ensure vague guard laugh crowd man stomach',
    'https://rinkeby.infura.io/YfN9MatBIrqHOPqfZz5l'
);

const web3 = new Web3(provider);

const deploy = async()=>{
   const accounts =  await web3.eth.getAccounts();
   const result = await new web3.eth.Contract(JSON.parse(CampaignFactory.interface))
   .deploy({data : CampaignFactory.bytecode})
   .send({from : accounts[0],gas : '1000000'});

    const data = {
       "address" : result.options.address
    };
    const addressPath = path.resolve(__dirname,'build','address.json');
    fs.ensureFileSync(addressPath);
    fs.outputJsonSync(addressPath,data);

    console.log(result.options.address);
};
deploy();