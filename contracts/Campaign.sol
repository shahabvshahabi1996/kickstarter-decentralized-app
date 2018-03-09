pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    struct CampaignStruct {
        string campaginName;
        string aboutCamapaign;
        string category;
        string author;
        string image;
        uint budget;
        uint minumumContribution;
        address manager;
        address campaignAddress;
    }
    
    CampaignStruct[] public campaigns;
        
    function createCampaign(uint minumum,
    string Name,
    string About,
    string Category,
    string Author,
    string Image,
    uint dreamyBudget)
    public {
        address newCampaign = new Campaign(
            minumum,
            msg.sender,
            Name,
            About,
            Category,
            Author,
            Image,
            dreamyBudget);
        
        CampaignStruct memory newCamp = CampaignStruct({
            campaginName : Name,
            aboutCamapaign : About,
            category : Category,
            author : Author,
            image : Image,
            budget : dreamyBudget,
            minumumContribution : minumum,
            manager : msg.sender,
            campaignAddress : newCampaign
        });
        
        campaigns.push(newCamp);
        
        deployedCampaigns.push(newCampaign);
    }
    
    function getAllCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
    
    function getCampaignLength() public view returns(uint){
        return campaigns.length;
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
    
    string public CampaginName;
    string public AboutCamapaign;
    string public Category;
    string public Author;
    string public Image;
    uint public DreamyBudget;
    
    
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
    
    function Campaign(
    uint minumum,
    address creator,
    string Name,
    string aboutCamapaign,
    string category,
    string author,
    string image,
    uint dreamyBudget) public {
        manager = creator;
        minumumContribution = minumum;
        CampaginName = Name;
        AboutCamapaign = aboutCamapaign;
        Category = category;
        Author = author;
        Image = image;
        DreamyBudget = dreamyBudget;
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
    
    function getSummary() public view returns(uint, uint, uint, uint, address, string, string, string, string, string) {
        return ( minumumContribution, DreamyBudget, this.balance, approversCount, manager, CampaginName, Author, Image, AboutCamapaign, Category);
    }

    function getRequestsLength() public view returns(uint) {
        return requests.length;
    }
    
}