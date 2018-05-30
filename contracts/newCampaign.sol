pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    address public tempAddress;
    
    function createCampaign(uint minumum) public {
        address newCampaign = new Campaign(minumum,msg.sender);
        deployedCampaigns.push(newCampaign);
        tempAddress = newCampaign;
    }
    
    function getAllCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
    
}

contract Campaign {
    
    address public manager;
    
    uint public minumumContribution;
    uint public approversCount = 0;
    uint public budget = 0;
    
    mapping (address => bool) public approvers;
    
    
    
    modifier isValidValue {
        require(msg.value >= minumumContribution);
        _;
    }
    
    modifier isManager {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minumum,address creator) public {
        manager = creator;
        minumumContribution = minumum;
    }
    
    function contribute() isValidValue public payable {
        if(approvers[msg.sender]){
            approvers[msg.sender] = true;
            budget += msg.value;
        } else {
            approvers[msg.sender] = true;
            budget += msg.value;
            approversCount++;
        }
    }
    
    function collectMoney() isManager public payable {
        manager.transfer(this.balance);
    }
    
    //manager , balance ,minumumContribution , approversCount
    
    function getSummary() public view returns(address , uint , uint , uint){
        return ( manager , this.balance , minumumContribution , approversCount );
    }
    
}