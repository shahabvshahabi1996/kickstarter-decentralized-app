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

    await factory.methods.createCampaign('100','new projetc','about','category','alireza','asdansdasndk','100000')
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
            value : '100'
        });

        const count = await campaign.methods.approversCount().call();
        assert.equal(count,1);
    });

    it('allows to people send their money and add them as approvers',async()=>{
        await campaign.methods.contribute().send({
            from : accounts[1],
            value : '100'
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call(); 
        assert(isContributor);
        
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

    it('allows a manager to make a payment request',async()=>{
        await campaign.methods.createRequest('buying something','100',accounts[1]).send({
            from : accounts[0],
            gas : '1000000'
        });

        const request = await campaign.methods.requests(0).call();
        assert.equal('buying something',request.description);
    });

    it('process requests',async()=>{
        await campaign.methods.contribute().send({
            from : accounts[0],
            value : web3.utils.toWei('10','ether')
        });
        
        await campaign.methods.createRequest('buying something',web3.utils.toWei('5','ether'),accounts[1]).send({
            from : accounts[0],
            gas : '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from : accounts[0],
            gas : '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from : accounts[0],
            gas : '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);

        balance = web3.utils.fromWei(balance,'ether');
        balance = parseFloat(balance);

        assert(balance >= 104);
    });

    it('goes wrong if normal user try to make request',async()=>{
        try {
            await campaign.methods.createRequest('buying something',web3.utils.toWei('5','ether'),accounts[1]).send({
                from : accounts[1],
                gas : '1000000'
            });
        } catch (error) {
            assert(error)
        }
    });

    it('goes wrong if normal user finalize the Request',async()=>{
        try {
            await campaign.methods.contribute().send({
                from : accounts[0],
                value : web3.utils.toWei('10','ether')
            });
            
            await campaign.methods.createRequest('buying something',web3.utils.toWei('5','ether'),accounts[1]).send({
                from : accounts[0],
                gas : '1000000'
            });
    
            await campaign.methods.approveRequest(0).send({
                from : accounts[0],
                gas : '1000000'
            });
    
            await campaign.methods.finalizeRequest(0).send({
                from : accounts[2],
                gas : '1000000'
            });
        } catch (error) {
            assert(error)
        }
    });

    it('not allow to approve a request from a user that not donated',async()=>{
        try {
            await campaign.methods.contribute().send({
                from : accounts[0],
                value : web3.utils.toWei('10','ether')
            });
            
            await campaign.methods.createRequest('buying something',web3.utils.toWei('5','ether'),accounts[1]).send({
                from : accounts[0],
                gas : '1000000'
            });
    
            await campaign.methods.approveRequest(0).send({
                from : accounts[2],
                gas : '1000000'
            });
    
        } catch (error) {
            assert(error);     
        }
    });
});

