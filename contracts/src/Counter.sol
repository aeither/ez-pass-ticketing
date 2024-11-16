// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TicketingSystem {
    struct Campaign {
        uint256 id;
        address owner;
        string name;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 availableTickets;
        uint256 expiryDate;
        bool active;
    }

    struct Ticket {
        uint256 campaignId;
        address owner;
        bool isRedeemed;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(address => mapping(uint256 => Ticket[])) public userTickets;
    
    uint256 private campaignCounter;
    
    event CampaignCreated(uint256 indexed campaignId, string name, uint256 ticketPrice);
    event TicketPurchased(uint256 indexed campaignId, address indexed buyer);
    event TicketRedeemed(uint256 indexed campaignId, address indexed holder);

    error CampaignNotActive();
    error InsufficientPayment();
    error NoTicketsAvailable();
    error TicketAlreadyRedeemed();
    error NotTicketOwner();
    error CampaignExpired();

    function createCampaign(
        string memory _name,
        uint256 _ticketPrice,
        uint256 _totalTickets,
        uint256 _durationInDays
    ) external returns (uint256) {
        campaignCounter++;
        
        campaigns[campaignCounter] = Campaign({
            id: campaignCounter,
            owner: msg.sender,
            name: _name,
            ticketPrice: _ticketPrice,
            totalTickets: _totalTickets,
            availableTickets: _totalTickets,
            expiryDate: block.timestamp + (_durationInDays * 1 days),
            active: true
        });

        emit CampaignCreated(campaignCounter, _name, _ticketPrice);
        return campaignCounter;
    }

    function buyTicket(uint256 _campaignId) external payable {
        Campaign storage campaign = campaigns[_campaignId];
        
        if (!campaign.active) revert CampaignNotActive();
        if (block.timestamp >= campaign.expiryDate) revert CampaignExpired();
        if (campaign.availableTickets == 0) revert NoTicketsAvailable();
        if (msg.value < campaign.ticketPrice) revert InsufficientPayment();

        campaign.availableTickets--;
        
        Ticket memory newTicket = Ticket({
            campaignId: _campaignId,
            owner: msg.sender,
            isRedeemed: false
        });

        userTickets[msg.sender][_campaignId].push(newTicket);
        
        // Return excess payment if any
        if (msg.value > campaign.ticketPrice) {
            payable(msg.sender).transfer(msg.value - campaign.ticketPrice);
        }

        emit TicketPurchased(_campaignId, msg.sender);
    }

    function redeemTicket(uint256 _campaignId, uint256 _ticketIndex) external {
        Ticket[] storage tickets = userTickets[msg.sender][_campaignId];
        
        if (_ticketIndex >= tickets.length) revert NotTicketOwner();
        if (tickets[_ticketIndex].isRedeemed) revert TicketAlreadyRedeemed();
        if (block.timestamp >= campaigns[_campaignId].expiryDate) revert CampaignExpired();

        tickets[_ticketIndex].isRedeemed = true;
        
        emit TicketRedeemed(_campaignId, msg.sender);
    }

    // View functions
    function getCampaign(uint256 _campaignId) external view returns (Campaign memory) {
        return campaigns[_campaignId];
    }

    function getUserTickets(address _user, uint256 _campaignId) external view returns (Ticket[] memory) {
        return userTickets[_user][_campaignId];
    }
}