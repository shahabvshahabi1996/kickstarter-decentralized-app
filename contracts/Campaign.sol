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
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCounts;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    
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
    
    modifier isDonated {
        require(approvers[msg.sender]);
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
        }else {
            approvers[msg.sender] = true;
            budget += msg.value;
            approversCount++;
        }
    }
    
    function createRequest(string description,uint value,address recipient) isManager public {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recipient : recipient,
            complete : false,
            approvalCounts : 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) isDonated public {
        Request storage request = requests[index];
        
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        
        request.approvalCounts++;
    }
    
    
    function finalizeRequest(uint index) isManager public payable  {
        Request storage request = requests[index];
        
        require(!request.complete);
        require(request.approvalCounts > (approversCount / 2)  );
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
    //manager , balance ,minumumContribution , approversCount
    
    function getSummary() public view returns(address , uint , uint , uint){
        return ( manager , this.balance , minumumContribution , approversCount );
    }
    
}