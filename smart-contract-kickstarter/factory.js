import web3 from './web3';
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xbdD499AD478Db30E4f6b6FF01F923F47e01cfd46'
);

export default instance;
