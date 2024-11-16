// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract TicketingSystem is ERC721, AccessControl, ReentrancyGuard, Pausable {
    error InvalidAmount();
    error CampaignNotFound();
    error InsufficientTickets();
    error InvalidDates();
    error InvalidFees();
    error Unauthorized();
    error TransferFailed();
    error CampaignExpired();
    error CampaignNotStarted();
    error SecretNotFound();
    error TransferNotFound();
    error TransferAlreadyCompleted();
    error InvalidTransferState();

    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");

    struct Campaign {
        string name;
        string description;
        uint96 pricePerTicket;
        uint8 platformFeePercentage;
        uint8 transferFeePercentage;
        uint40 startDate;
        uint40 expirationDate;
        string imageUrl;
        string city;
        string country;
        address owner;
        uint32 ticketsAvailable;
        uint32 ticketsSold;
        bool exists;
        string storeId;
        string secretName;
        string category;
        string eventType;
        uint256 campaignId;
    }

    struct Ticket {
        uint256 campaignId;
        uint40 purchaseDate;
        address owner;
        uint32 ticketIndex;
        string secret;
        string imageUrl;
        string nillionUserId;
        string nillionStoreId;
        string nillionPidToSid;
    }

    struct TransferListing {
        uint256 transferId;
        uint256 tokenId;
        uint256 campaignId;
        address from;
        address to;
        uint256 amount;
        bool isCompleted;
        uint40 createDate;
    }


    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => TransferListing) public transfers;
    mapping(uint256 => mapping(uint32 => string)) private ticketSecrets;
    uint256 public campaignCount;
    uint256 public tokenIdCounter;
    uint256 public transferCount;
    address public immutable platformOwner;

    event CampaignCreated(
        uint256 indexed campaignId,
        string name,
        uint96 pricePerTicket,
        uint40 startDate,
        uint40 expirationDate,
        address indexed owner,
        string category
    );
    event TicketBought(uint256 indexed tokenId, uint256 indexed campaignId, address indexed buyer);
    event TicketTransferred(uint256 indexed tokenId, address indexed from, address indexed to, uint256 amount);
    event SecretSet(uint256 indexed campaignId, uint32 ticketIndex);
    event TransferCreated(uint256 indexed transferId, uint256 indexed tokenId, address indexed from, uint256 amount);
    event TransferCompleted(uint256 indexed transferId, uint256 indexed tokenId, address indexed to, uint256 amount);
    event TransferCancelled(uint256 indexed transferId, uint256 indexed tokenId);

    constructor() ERC721("TicketNFT", "TICKET") {
        platformOwner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(UPDATER_ROLE, msg.sender);
    }

    modifier validCampaign(uint256 campaignId) {
        if (!campaigns[campaignId].exists) revert CampaignNotFound();
        _;
    }

    modifier validTransfer(uint256 transferId) {
        if (transferId == 0 || transferId > transferCount) revert TransferNotFound();
        if (transfers[transferId].isCompleted) revert TransferAlreadyCompleted();
        _;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function createCampaign(
        string calldata _name,
        string calldata _description,
        uint96 _pricePerTicket,
        uint8 _platformFeePercentage,
        uint8 _transferFeePercentage,
        uint40 _startDate,
        uint40 _expirationDate,
        string calldata _imageUrl,
        string calldata _city,
        string calldata _country,
        uint32 _ticketsAvailable,
        string calldata _storeId,
        string calldata _secretName,
        string calldata _category,
        string calldata _eventType
    ) external whenNotPaused returns (uint256) {
        if (_ticketsAvailable == 0) revert InvalidAmount();
        if (_platformFeePercentage > 100) revert InvalidFees();
        if (_transferFeePercentage > 100) revert InvalidFees();
        if (_startDate >= _expirationDate) revert InvalidDates();

        unchecked {
            campaignCount++;
        }

        campaigns[campaignCount] = Campaign({
            name: _name,
            description: _description,
            pricePerTicket: _pricePerTicket,
            platformFeePercentage: _platformFeePercentage,
            transferFeePercentage: _transferFeePercentage,
            startDate: _startDate,
            expirationDate: _expirationDate,
            imageUrl: _imageUrl,
            city: _city,
            country: _country,
            owner: msg.sender,
            ticketsAvailable: _ticketsAvailable,
            ticketsSold: 0,
            exists: true,
            storeId: _storeId,
            secretName: _secretName,
            category: _category,
            eventType: _eventType,
            campaignId: campaignCount

        });

        emit CampaignCreated(
            campaignCount,
            _name,
            _pricePerTicket,
            _startDate,
            _expirationDate,
            msg.sender,
            _category
        );

        return campaignCount;
    }

    function createTestCampaign(
        string calldata name,
        uint96 price,
        uint32 tickets
    ) external whenNotPaused returns (uint256) {
        unchecked {
            campaignCount++;
        }

        campaigns[campaignCount] = Campaign({
            name: name,
            description: "Test Description",
            pricePerTicket: price,
            platformFeePercentage: 5,
            transferFeePercentage: 2,
            startDate: uint40(block.timestamp),
            expirationDate: uint40(block.timestamp + 30 days),
            imageUrl: "test-image.jpg",
            city: "Test City",
            country: "Test Country",
            owner: msg.sender,
            ticketsAvailable: tickets,
            ticketsSold: 0,
            exists: true,
            storeId: "test-store-123",
            secretName: "test-secret-123",
            category: "Test Category",
            eventType: "Test Event",
            campaignId: campaignCount
        });

        emit CampaignCreated(
            campaignCount,
            name,
            price,
            uint40(block.timestamp),
            uint40(block.timestamp + 30 days),
            msg.sender,
            "Test Category"
        );

        return campaignCount;
    }

    function setTicketSecret(
        uint256 campaignId,
        uint32 ticketIndex,
        string calldata secret
    ) external validCampaign(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.owner != msg.sender) revert Unauthorized();
        if (ticketIndex >= campaign.ticketsAvailable) revert InvalidAmount();

        ticketSecrets[campaignId][ticketIndex] = secret;
        emit SecretSet(campaignId, ticketIndex);
    }

    function buyTicket(uint256 campaignId, string calldata imageUrl, string calldata nillionStoreId, string calldata nillionUserId)
    external
    payable
    whenNotPaused
    nonReentrant
    validCampaign(campaignId)
    returns (uint256)
    {
        Campaign storage campaign = campaigns[campaignId];

        if (campaign.ticketsAvailable <= campaign.ticketsSold) revert InsufficientTickets();
        if (block.timestamp < campaign.startDate) revert CampaignNotStarted();
        if (block.timestamp > campaign.expirationDate) revert CampaignExpired();
        if (msg.value < campaign.pricePerTicket) revert InvalidAmount();

        uint256 platformFee = (msg.value * campaign.platformFeePercentage) / 100;
        uint256 sellerAmount = msg.value - platformFee;

        (bool platformSuccess,) = platformOwner.call{value: platformFee}("");
        if (!platformSuccess) revert TransferFailed();

        (bool sellerSuccess,) = campaign.owner.call{value: sellerAmount}("");
        if (!sellerSuccess) revert TransferFailed();

        unchecked {
            tokenIdCounter++;
            campaign.ticketsSold++;
        }

        _safeMint(msg.sender, tokenIdCounter);

        string memory ticketSecret = ticketSecrets[campaignId][campaign.ticketsSold - 1];

        tickets[tokenIdCounter] = Ticket({
            campaignId: campaignId,
            purchaseDate: uint40(block.timestamp),
            owner: msg.sender,
            ticketIndex: campaign.ticketsSold - 1,
            secret: ticketSecret,
            imageUrl: imageUrl,
            nillionStoreId: nillionStoreId,
            nillionUserId: nillionUserId,
            nillionPidToSid: ""
        });

        emit TicketBought(tokenIdCounter, campaignId, msg.sender);
        return tokenIdCounter;
    }

    function redeemTicket(
        uint256 tokenId,
        string calldata pidToSid
    ) external whenNotPaused {
        Ticket storage ticket = tickets[tokenId];
        if (ticket.owner != msg.sender) revert Unauthorized();
        if (ticket.owner == address(0)) revert TransferNotFound();
        Campaign storage campaign = campaigns[ticket.campaignId];
        if (block.timestamp > campaign.expirationDate) revert CampaignExpired();
        ticket.nillionPidToSid = pidToSid;
    }

    function createTransfer(uint256 tokenId, uint256 amount) external whenNotPaused returns (uint256) {
        if (tickets[tokenId].owner != msg.sender) revert Unauthorized();
        Campaign storage campaign = campaigns[tickets[tokenId].campaignId];
        if (block.timestamp > campaign.expirationDate) revert CampaignExpired();

        unchecked {
            transferCount++;
        }

        transfers[transferCount] = TransferListing({
            transferId: transferCount,
            tokenId: tokenId,
            campaignId: tickets[tokenId].campaignId,
            from: msg.sender,
            to: address(0),
            amount: amount,
            isCompleted: false,
            createDate: uint40(block.timestamp)
        });

        emit TransferCreated(transferCount, tokenId, msg.sender, amount);
        return transferCount;
    }

    function completeTransfer(uint256 transferId)
    external
    payable
    whenNotPaused
    nonReentrant
    validTransfer(transferId)
    {
        TransferListing storage transfer = transfers[transferId];
        Campaign storage campaign = campaigns[transfer.campaignId];

        if (block.timestamp > campaign.expirationDate) revert CampaignExpired();
        if (msg.value != transfer.amount) revert InvalidAmount();

        uint256 transferFee = (msg.value * campaign.transferFeePercentage) / 100;
        uint256 sellerAmount = msg.value - transferFee;

        (bool feeSuccess,) = campaign.owner.call{value: transferFee}("");
        if (!feeSuccess) revert TransferFailed();

        (bool sellerSuccess,) = transfer.from.call{value: sellerAmount}("");
        if (!sellerSuccess) revert TransferFailed();

        tickets[transfer.tokenId].owner = msg.sender;
        _transfer(transfer.from, msg.sender, transfer.tokenId);

        transfer.to = msg.sender;
        transfer.isCompleted = true;

        emit TransferCompleted(transferId, transfer.tokenId, msg.sender, msg.value);
    }

    function cancelTransfer(uint256 transferId)
    external
    whenNotPaused
    validTransfer(transferId)
    {
        TransferListing storage transfer = transfers[transferId];
        if (transfer.from != msg.sender) revert Unauthorized();

        transfer.isCompleted = true;
        emit TransferCancelled(transferId, transfer.tokenId);
    }

    function getPendingTransfersByCampaign(uint256 campaignId)
    external
    view
    validCampaign(campaignId)
    returns (TransferListing[] memory)
    {
        uint256 pendingCount = 0;
        for (uint256 i = 1; i <= transferCount; i++) {
            if (transfers[i].campaignId == campaignId && !transfers[i].isCompleted) {
                pendingCount++;
            }
        }

        if (pendingCount == 0) {
            return new TransferListing[](0);
        }

        TransferListing[] memory pendingTransfers = new TransferListing[](pendingCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= transferCount && currentIndex < pendingCount; i++) {
            if (transfers[i].campaignId == campaignId && !transfers[i].isCompleted) {
                pendingTransfers[currentIndex] = transfers[i];
                currentIndex++;
            }
        }

        return pendingTransfers;
    }

    function getCampaignsByPage(uint256 page, uint256 pageSize)
    external
    view
    returns (Campaign[] memory)
    {
        uint256 start = page * pageSize;
        uint256 end = start + pageSize;
        if (end > campaignCount) {
            end = campaignCount;
        }
        if (start >= end) {
            return new Campaign[](0);
        }

        Campaign[] memory result = new Campaign[](end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = campaigns[i + 1];
        }
        return result;
    }

    function getCampaignById(uint256 campaignId)
    external
    view
    validCampaign(campaignId)
    returns (Campaign memory)
    {
        return campaigns[campaignId];
    }

    function getCampaignsByCountry(string calldata _country, uint256 page, uint256 pageSize)
    external
    view
    returns (Campaign[] memory)
    {
        uint256 matchCount = 0;
        for (uint256 i = 1; i <= campaignCount; i++) {
            if (keccak256(bytes(campaigns[i].country)) == keccak256(bytes(_country))) {
                matchCount++;
            }
        }

        if (matchCount == 0) {
            return new Campaign[](0);
        }

        uint256 start = page * pageSize;
        uint256 end = start + pageSize;
        if (end > matchCount) {
            end = matchCount;
        }
        if (start >= end) {
            return new Campaign[](0);
        }

        Campaign[] memory result = new Campaign[](end - start);
        uint256 currentIndex = 0;
        uint256 resultIndex = 0;

        for (uint256 i = 1; i <= campaignCount && resultIndex < result.length; i++) {
            if (keccak256(bytes(campaigns[i].country)) == keccak256(bytes(_country))) {
                if (currentIndex >= start) {
                    result[resultIndex] = campaigns[i];
                    resultIndex++;
                }
                currentIndex++;
            }
        }

        return result;
    }

    function getCampaignsByCity(string calldata _city, uint256 page, uint256 pageSize)
    external
    view
    returns (Campaign[] memory)
    {
        uint256 matchCount = 0;
        for (uint256 i = 1; i <= campaignCount; i++) {
            if (keccak256(bytes(campaigns[i].city)) == keccak256(bytes(_city))) {
                matchCount++;
            }
        }

        if (matchCount == 0) {
            return new Campaign[](0);
        }

        uint256 start = page * pageSize;
        uint256 end = start + pageSize;
        if (end > matchCount) {
            end = matchCount;
        }
        if (start >= end) {
            return new Campaign[](0);
        }

        Campaign[] memory result = new Campaign[](end - start);
        uint256 currentIndex = 0;
        uint256 resultIndex = 0;

        for (uint256 i = 1; i <= campaignCount && resultIndex < result.length; i++) {
            if (keccak256(bytes(campaigns[i].city)) == keccak256(bytes(_city))) {
                if (currentIndex >= start) {
                    result[resultIndex] = campaigns[i];
                    resultIndex++;
                }
                currentIndex++;
            }
        }

        return result;
    }


    function getTransfer(uint256 transferId) external view returns (TransferListing memory) {
        return transfers[transferId];
    }

    function getTicket(uint256 tokenId)
    external
    view
    returns (Ticket memory)
    {
        if (tickets[tokenId].owner != msg.sender &&
            msg.sender != campaigns[tickets[tokenId].campaignId].owner) {
            revert Unauthorized();
        }
        return tickets[tokenId];
    }

    function getUserTickets(address user)
    external
    view
    returns (Ticket[] memory)
    {
        // First, count the number of tickets owned by the user
        uint256 userTicketCount = 0;
        for (uint256 i = 1; i <= tokenIdCounter; i++) {
            if (tickets[i].owner == user) {
                userTicketCount++;
            }
        }

        // Create array with the exact size needed
        Ticket[] memory userTickets = new Ticket[](userTicketCount);

        // Fill the array with user's tickets
        uint256 currentIndex = 0;
        for (uint256 i = 1; i <= tokenIdCounter; i++) {
            if (tickets[i].owner == user) {
                userTickets[currentIndex] = tickets[i];
                currentIndex++;
            }
        }

        return userTickets;
    }


    function getTicketSecret(uint256 tokenId)
    external
    view
    returns (string memory)
    {
        Ticket storage ticket = tickets[tokenId];
        if (ticket.owner != msg.sender &&
            msg.sender != campaigns[ticket.campaignId].owner) {
            revert Unauthorized();
        }
        return ticket.secret;
    }

    function getCampaignTickets(uint256 campaignId)
    external
    view
    validCampaign(campaignId)
    returns (Ticket[] memory)
    {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.owner != msg.sender) revert Unauthorized();

        Ticket[] memory campaignTickets = new Ticket[](campaign.ticketsSold);
        uint256 ticketCount = 0;

        for (uint256 i = 1; i <= tokenIdCounter; i++) {
            if (tickets[i].campaignId == campaignId) {
                campaignTickets[ticketCount] = tickets[i];
                ticketCount++;
            }
        }

        return campaignTickets;
    }

    function pause()
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _pause();
    }

    function unpause()
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _unpause();
    }

    function setUpdater(address account)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(UPDATER_ROLE, account);
    }

    function removeUpdater(address account)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(UPDATER_ROLE, account);
    }
}