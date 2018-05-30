const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const Campaign = require('../build/Campaign.json');
const CampaignFactory = require('../build/CampaignFactory.json')

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(CampaignFactory.interface))
    .deploy({data : CampaignFactory.bytecode})
    .send({from : accounts[0],gas : '3000000'});

    await factory.methods.createCampaign('100000')
    .send({from : accounts[0],gas : '3000000'});

    [campaignAddress] = await factory.methods.getAllCampaigns().call();

    campaign = await new web3.eth.Contract(JSON.parse(Campaign.interface),campaignAddress);
});

describe("Campaign",()=>{
    it('works fine!',()=>{
        assert(true);
    });

    it('deployes a factory and a campaign',()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as the campaign manager',async()=>{
        const manager = await campaign.methods.manager().call();
        assert.equal(manager,accounts[0])
    });

    it('can count contributers',async ()=>{
        await campaign.methods.contribute().send({
            from : accounts[1],
            value : web3.utils.toWei('10','ether')
        });

        const count = await campaign.methods.approversCount().call();
        assert.equal(count,1);
    });

    it('has a minimum contribution',async()=>{
        try {
            await campaign.methods.contribute().send({
                from : accounts[1],
                value : '5'
            });
        } catch (error) {
            assert(error)
        }
    });

    it('can collect the money(manager)',async () => {
        let Oldbalance = await web3.eth.getBalance(accounts[0]);
        Oldbalance = web3.utils.fromWei(Oldbalance,'ether');
        Oldbalance = parseFloat(Oldbalance);

        await campaign.methods.contribute().send({
            from : accounts[1],
            value : web3.utils.toWei('10','ether')
        });
        await campaign.methods.collectMoney().send({
            from : accounts[0]
        });
        let balance = await web3.eth.getBalance(accounts[0]);

        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);

        assert(balance > Oldbalance);
    });
});

