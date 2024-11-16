import { ethers, Contract } from 'ethers';
import { TicketAPI } from './ticketApi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

async function redeemTicket(tokenId: number) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const walletAddress = await provider.getSigner().getAddress();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner());

        // Get ticket details from contract
        const ticket = await contract.getTicket(tokenId);

        // Verify ticket owner
        if (ticket.owner.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new Error("Not ticket owner");
        }

        // Call redeem API
        const redeemData = await TicketAPI.redeemTicket(
            ticket.nillionUserId,
            ticket.nillionStoreId,
            ticket.ticketIndex,
            walletAddress
        );

        // Store redeem response in contract
        await contract.redeemTicket(
            tokenId,
            redeemData.party_ids_to_store_ids
        );

        console.log("Ticket redeemed successfully!", {
            tokenId,
            storeId: redeemData.store_id,
            partyIdsToStoreIds: redeemData.party_ids_to_store_ids
        });

        return redeemData;

    } catch (error) {
        console.error("Error redeeming ticket:", error);
        throw error;
    }
}

export default redeemTicket;