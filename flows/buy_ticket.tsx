import { ethers, Contract } from 'ethers';
import { TicketAPI } from './ticketApi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';
import Hyperbolic from './Hyperbolic';

async function buyTicket(campaignId: number) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const walletAddress = await provider.getSigner().getAddress();

        // Get campaign details from contract
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner());
        const campaign = await contract.getCampaignById(campaignId);

        // Generate image using campaign description
        console.log("Generating ticket image from campaign description...");
        const hyperbolic = new Hyperbolic(campaign.description);
        const imageUrl = await hyperbolic.getIpfsUrl();

        if (!imageUrl) {
            throw new Error("Failed to generate and upload image");
        }

        console.log("Image uploaded to IPFS:", imageUrl);

        // Register with converted wallet ID
        const regData = await TicketAPI.registerTicket(campaignId, walletAddress, provider);

        // Buy ticket from contract with generated image URL
        await contract.buyTicket(campaignId, imageUrl, regData.store_id, regData.user_id);

        console.log("Ticket purchased successfully!");

        return {
            regData,
            imageUrl
        };
    } catch (error) {
        console.error("Error purchasing ticket:", error);
        throw error;
    }
}
