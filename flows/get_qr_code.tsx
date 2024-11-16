// Function to get Ticket QR Code
import { ethers, Contract } from 'ethers';
import crypto from 'crypto';
import { retrieveSecret } from '../../../lib/nillionStore';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants';

const nillionConfig = {
    appId: process.env.NEXT_PUBLIC_WORLD_APP_ID || '',
    contractName: "your_contract_name",
};

const hashStr = (str: string): string => {
    return crypto.createHash("sha256").update(str).digest("hex");
};

async function getTicketQRCode(storeId: string, partyIdsToStoreIds: string) {
    try {
        // Verify the ticket using the API
        const verifyResponse = await verifyTicket(storeId, partyIdsToStoreIds); //nillios

        if (verifyResponse.result.status !== 1) {
            throw new Error("Ticket verification failed");
        }

        console.log("Ticket Verified Successfully.");

        // Retrieve secret associated with the ticket
        const secretName = hashStr(verifyResponse.message || "");
        const retrievedSecret = await retrieveSecret(
            nillionConfig,
            storeId,
            secretName,
            0 // Assuming index 0 for simplicity; update as needed
        );

        console.log("Retrieved Ticket Secret:", retrievedSecret.secret);

        return {
            verifyResponse,
            retrievedSecret,
        };
    } catch (error) {
        console.error("Error retrieving ticket QR code:", error);
        throw error;
    }

    // store in the localstorage  for future use