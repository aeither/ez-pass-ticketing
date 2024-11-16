// Function to Create Campaign
import { ethers, Contract } from 'ethers';
import crypto from 'crypto';
import { storeSecret } from '../../../lib/nillionStore';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';
import { uploadToIpfs } from './ipfs'; // Hypothetical IPFS upload function

const nillionConfig = {
    appId: process.env.NEXT_PUBLIC_WORLD_APP_ID || '',
    contractName: "your_contract_name",
};

const hashStr = (str: string): string => {
    return crypto.createHash("sha256").update(str).digest("hex");
};

async function createCampaign(campaignData: {
    name: string;
    description: string;
    pricePerTicket: number;
    startDate: number;
    expirationDate: number;
    ticketsCSV: string; // Comma-separated ticket data
    owner: string;
    imageFile: File; // Customer-uploaded image
}) {
    try {
        // Store the CSV data in Nillion
        console.log("Storing tickets CSV in Nillion...");
        const secretResult = await storeSecret(nillionConfig, campaignData.ticketsCSV);

        if (!secretResult || !secretResult.secretName) {
            throw new Error("Failed to store tickets CSV");
        }

        console.log("Tickets CSV stored successfully with secret name:", secretResult.secretName);

        // Upload customer-provided image to IPFS
        console.log("Uploading campaign image to IPFS...");
        const imageUrl = await uploadToIpfs(campaignData.imageFile);

        if (!imageUrl) {
            throw new Error("Failed to upload image to IPFS");
        }

        console.log("Campaign image uploaded to IPFS with URL:", imageUrl);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Deploy the campaign contract
        console.log("Deploying campaign contract...");
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx = await contract.createCampaign(
            campaignData.name,
            campaignData.description,
            campaignData.pricePerTicket,
            campaignData.startDate,
            campaignData.expirationDate,
            campaignData.owner,
            secretResult.secretName,
            imageUrl
        );

        console.log("Waiting for transaction confirmation...");
        await tx.wait();

        console.log("Campaign created successfully! Transaction Hash:", tx.hash);

        return {
            transactionHash: tx.hash,
            secretName: secretResult.secretName,
            imageUrl
        };
    } catch (error) {
        console.error("Error creating campaign:", error);
        throw error;
    }
}

export { createCampaign };
