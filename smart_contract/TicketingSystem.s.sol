// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/TicketingSystem.sol";

contract TicketingSystemTest is Test {
    TicketingSystem public system;
    address payable owner = payable(makeAddr("owner"));
    address payable buyer = payable(makeAddr("buyer"));
    address payable buyer2 = payable(makeAddr("buyer2"));
    address payable campaignOwner = payable(makeAddr("campaignOwner"));

    uint40 startDate;
    uint40 expirationDate;
    uint96 constant TICKET_PRICE = 0.1 ether;

    function setUp() public {
        // Deploy contract as owner
        vm.startPrank(owner);
        system = new TicketingSystem();
        vm.stopPrank();

        startDate = uint40(block.timestamp);
        expirationDate = uint40(block.timestamp + 30 days);

        // Make sure receivers can accept ETH
        vm.deal(address(system), 10 ether);
        vm.deal(campaignOwner, 1 ether);
    }

    function test_CreateCampaign() public {
        uint256 campaignId = _createCampaign();
        TicketingSystem.Campaign memory campaign = system.getCampaignById(campaignId);

        assertEq(campaign.name, "Test Event");
        assertEq(campaign.pricePerTicket, TICKET_PRICE);
        assertEq(campaign.ticketsAvailable, 100);
        assertEq(campaign.ticketsSold, 0);
    }

    function test_BuyTicket() public {
        uint256 campaignId = _createCampaign();

        // Setup buyer
        vm.deal(buyer, 1 ether);

        vm.prank(buyer);
        uint256 tokenId = system.buyTicket{value: TICKET_PRICE}(
            campaignId,
            "test-image.jpg",
            "store123",  // nillionStoreId
            "user123"    // nillionUserId
        );

        // Verify ticket ownership
        assertEq(system.ownerOf(tokenId), buyer);

        vm.prank(buyer);
        TicketingSystem.Ticket memory ticket = system.getTicket(tokenId);
        assertEq(ticket.owner, buyer);
        assertEq(ticket.campaignId, campaignId);
        assertEq(ticket.nillionStoreId, "store123");
        assertEq(ticket.nillionUserId, "user123");
        assertEq(ticket.nillionPidToSid, ""); // Should be empty initially
    }

    function test_RedeemTicket() public {
        uint256 campaignId = _createCampaign();
        vm.deal(buyer, 1 ether);

        // Buy ticket
        vm.prank(buyer);
        uint256 tokenId = system.buyTicket{value: TICKET_PRICE}(
            campaignId,
            "test-image.jpg",
            "store123",
            "user123"
        );

        // Redeem ticket
        vm.prank(buyer);
        system.redeemTicket(tokenId, "pid2sid123");

        // Verify redemption
        vm.prank(buyer);
        TicketingSystem.Ticket memory ticket = system.getTicket(tokenId);
        assertEq(ticket.nillionPidToSid, "pid2sid123");
    }

    function test_RedeemTicket_Unauthorized() public {
        uint256 campaignId = _createCampaign();
        vm.deal(buyer, 1 ether);

        // Buy ticket
        vm.prank(buyer);
        uint256 tokenId = system.buyTicket{value: TICKET_PRICE}(
            campaignId,
            "test-image.jpg",
            "store123",
            "user123"
        );

        // Try to redeem with wrong address
        vm.prank(buyer2);
        vm.expectRevert(TicketingSystem.Unauthorized.selector);
        system.redeemTicket(tokenId, "pid2sid123");
    }

    function test_TransferTicket() public {
        // First buy a ticket
        uint256 campaignId = _createCampaign();
        vm.deal(buyer, 1 ether);

        vm.prank(buyer);
        uint256 tokenId = system.buyTicket{value: TICKET_PRICE}(
            campaignId,
            "test-image.jpg",
            "store123",
            "user123"
        );

        // Create transfer listing
        vm.prank(buyer);
        system.createTransfer(tokenId, TICKET_PRICE);

        // Complete transfer as buyer2
        vm.deal(buyer2, 1 ether);
        vm.prank(buyer2);
        system.completeTransfer{value: TICKET_PRICE}(1); // First transfer has ID 1

        // Verify new ownership
        assertEq(system.ownerOf(tokenId), buyer2);

        vm.prank(buyer2);
        TicketingSystem.Ticket memory ticket = system.getTicket(tokenId);
        assertEq(ticket.owner, buyer2);
        assertEq(ticket.nillionStoreId, "store123"); // Verify Nillion fields persist
        assertEq(ticket.nillionUserId, "user123");
    }

    function test_GetTransfer() public {
        // First buy a ticket
        uint256 campaignId = _createCampaign();
        vm.deal(buyer, 1 ether);

        vm.prank(buyer);
        uint256 tokenId = system.buyTicket{value: TICKET_PRICE}(
            campaignId,
            "test-image.jpg",
            "store123",
            "user123"
        );

        // Create transfer listing
        vm.prank(buyer);
        system.createTransfer(tokenId, TICKET_PRICE);

        // Get and verify transfer details
        TicketingSystem.TransferListing memory transfer = system.getTransfer(1);
        assertEq(transfer.tokenId, tokenId);
        assertEq(transfer.from, buyer);
        assertEq(transfer.amount, TICKET_PRICE);
        assertEq(transfer.isCompleted, false);
        assertEq(transfer.campaignId, campaignId);

        // Complete transfer and verify updated state
        vm.deal(buyer2, 1 ether);
        vm.prank(buyer2);
        system.completeTransfer{value: TICKET_PRICE}(1);

        transfer = system.getTransfer(1);
        assertEq(transfer.isCompleted, true);
        assertEq(transfer.to, buyer2);
    }

    // Helper function to create a test campaign
    function _createCampaign() internal returns (uint256) {
        vm.prank(campaignOwner);
        return system.createCampaign(
            "Test Event",      // name
            "Description",     // description
            TICKET_PRICE,      // pricePerTicket
            5,                 // platformFeePercentage
            2,                 // transferFeePercentage
            startDate,         // startDate
            expirationDate,    // expirationDate
            "image.jpg",       // imageUrl
            "New York",        // city
            "USA",            // country
            100,              // ticketsAvailable
            "store123",       // storeId
            "secret123",      // secretName
            "Music",          // category
            "Concert"         // eventType
        );
    }

    receive() external payable {}
}