import { useEffect } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abi as ticketingSystemABI } from "./abi";

const TICKETING_SYSTEM_ADDRESS = "0x150696D367eE549e5BaA8e91D2d825A2DA9ec3AE";

export function useTicketingSystem() {
	const { writeContract, data: hash } = useWriteContract({
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
						window.open(`https://sepolia.worldscan.org/tx/${hash}`, "_blank"),
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
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "createCampaign",
			args: [
				name,
				description,
				parseEther(pricePerTicket),
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
			],
		});
	};

	// Buy Ticket
	const buyTicket = async (
		campaignId: string,
		price: string,
		imageUrl: string,
	) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "buyTicket",
			value: parseEther(price),
			args: [BigInt(campaignId), imageUrl],
		});
	};

	// Create Transfer
	const createTransfer = async (tokenId: bigint, amount: string) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "createTransfer",
			args: [tokenId, parseEther(amount)],
		});
	};

	// Complete Transfer
	const completeTransfer = async (transferId: bigint, amount: string) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "completeTransfer",
			value: parseEther(amount),
			args: [transferId],
		});
	};

	// Cancel Transfer
	const cancelTransfer = async (transferId: bigint) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "cancelTransfer",
			args: [transferId],
		});
	};

	// Get Campaign by ID
	const useCampaign = (campaignId: number) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getCampaignById",
			args: [BigInt(campaignId)],
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
		isConfirmed,
		isConfirming,
	};
}