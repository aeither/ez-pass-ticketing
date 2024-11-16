import { useEffect } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abi as ticketingSystemABI } from "./abi";
import { abi as simpleTicketingSystemABI } from "./abiSimpleTicketing";
import { SIMPLE_TICKETING_SYSTEM_ADDRESS } from "./constants";
import { readClient } from "./readClient";

const TICKETING_SYSTEM_ADDRESS = "0x19a081e99566b32Bb6a306D3B144adE71b13aB78";
const BASE_EXPLORER_URL = "https://worldscan.org";

export function useTicketingSystem() {
	const {
		writeContract,
		writeContractAsync,
		data: hash,
	} = useWriteContract({
		mutation: {
			onSuccess(data) {
				console.log("Transaction hash:", data);
			},
			onError(error) {
				toast.error(error.message);
			},
		},
	});

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isConfirming) {
			toast.loading("Waiting for confirmation...", {
				id: "tx-confirming",
			});
		}

		if (isConfirmed && hash) {
			toast.success("Transaction confirmed!", {
				id: "tx-confirming",
				description: `Transaction hash: ${hash.slice(0, 6)}...${hash.slice(-4)}`,
				action: {
					label: "View on WorldScan",
					onClick: () =>
						window.open(`${BASE_EXPLORER_URL}/tx/${hash}`, "_blank"),
				},
				duration: 5000,
			});
		}
	}, [isConfirming, isConfirmed, hash]);

	// Create Campaign
	const createCampaign = async ({
		name,
		description,
		pricePerTicket,
		platformFeePercentage,
		transferFeePercentage,
		startDate,
		expirationDate,
		imageUrl,
		city,
		country,
		ticketsAvailable,
		storeId,
		secretName,
		category,
		eventType,
	}: {
		name: string;
		description: string;
		pricePerTicket: string;
		platformFeePercentage: number;
		transferFeePercentage: number;
		startDate: number;
		expirationDate: number;
		imageUrl: string;
		city: string;
		country: string;
		ticketsAvailable: number;
		storeId: string;
		secretName: string;
		category: string;
		eventType: string;
	}) => {
		return writeContractAsync({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "createCampaign",
			args: [
				"Test Event", // name
				"Description", // description
				parseEther("0.0000000"), // pricePerTicket
				5, // platformFeePercentage
				2, // transferFeePercentage
				Math.floor(Date.now() / 1000), // startDate
				Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // expirationDate
				"image.jpg", // imageUrl
				"New York", // city
				"USA", // country
				100, // ticketsAvailable
				"store123", // storeId
				"secret123", // secretName
				"Music", // category
				"Concert", // eventType
				// name,
				// description,
				// parseEther(pricePerTicket),
				// platformFeePercentage,
				// transferFeePercentage,
				// startDate,
				// expirationDate,
				// imageUrl,
				// city,
				// country,
				// ticketsAvailable,
				// storeId,
				// secretName,
				// category,
				// eventType,
			],
		});
	};

	// Create Campaign
	const createSimpleCampaign = async () => {
		return writeContractAsync({
			address: SIMPLE_TICKETING_SYSTEM_ADDRESS,
			abi: simpleTicketingSystemABI,
			functionName: "createCampaign",
			args: ["hello", BigInt(1), BigInt(1)],
		});
	};

	// Buy Ticket
	const buyTicket = async (
		campaignId: bigint,
		price: string,
		imageUrl: string,
	) => {
		console.log("price", price);

		return writeContractAsync({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "buyTicket",
			value: BigInt(price),
			args: [campaignId, imageUrl, "store123", "user123"],
		});
	};

	// Create Transfer
	const createTransfer = async (tokenId: bigint, amount: string) => {
		return writeContractAsync({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "createTransfer",
			args: [tokenId, parseEther(amount)],
		});
	};

	// Complete Transfer
	const completeTransfer = async (transferId: bigint, amount: string) => {
		return writeContractAsync({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "completeTransfer",
			value: parseEther(amount),
			args: [transferId],
		});
	};

	// Cancel Transfer
	const cancelTransfer = async (transferId: bigint) => {
		return writeContractAsync({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "cancelTransfer",
			args: [transferId],
		});
	};

	// Get Campaign by ID
	const useCampaign = (campaignId: number | undefined) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getCampaignById",
			args: campaignId ? [BigInt(campaignId)] : undefined,
		});
	};

	// Get Ticket
	const useTicket = (tokenId: number) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getTicket",
			args: [BigInt(tokenId)],
		});
	};

	// Get Campaigns by Page
	const useCampaignsByPage = (pageNumber: number, pageSize: number) => {
		console.log("useCampaignsByPage", pageNumber, pageSize);

		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getCampaignsByPage",
			args: [BigInt(pageNumber), BigInt(pageSize)],
		});
	};

	// Get Campaigns by Country
	const useCampaignsByCountry = (
		country: string,
		page: number,
		pageSize: number,
	) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getCampaignsByCountry",
			args: [country, BigInt(page), BigInt(pageSize)],
		});
	};

	// Get Campaigns by City
	const useCampaignsByCity = (city: string, page: number, pageSize: number) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getCampaignsByCity",
			args: [city, BigInt(page), BigInt(pageSize)],
		});
	};

	// Get User Tickets
	const getUserTickets = async (userAddress: string) => {
		try {
			const data = await readClient.readContract({
				address: TICKETING_SYSTEM_ADDRESS,
				abi: ticketingSystemABI,
				functionName: "getUserTickets",
				args: [userAddress as `0x${string}`],
			});
			return data;
		} catch (error) {
			console.error("Error fetching user tickets:", error);
			throw error;
		}
	};

	return {
		createCampaign,
		buyTicket,
		createTransfer,
		completeTransfer,
		cancelTransfer,
		useCampaign,
		useTicket,
		useCampaignsByPage,
		useCampaignsByCountry,
		useCampaignsByCity,
		getUserTickets,
		isConfirmed,
		isConfirming,
	};
}
