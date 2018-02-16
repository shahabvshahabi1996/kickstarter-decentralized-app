const web3 = require('./web3.js');
const CampaignFactory =  require("./build/CampaignFactory.json");
const { address } = require("./build/address.json");

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    address
);

export default instance;