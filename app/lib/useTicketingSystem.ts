import { useEffect } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import {
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { abi as ticketingSystemABI } from "./abi";

const TICKETING_SYSTEM_ADDRESS = "0xF5D6fB2aAca795684f3fc4319d2Bb282a722B14a";

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
		transferCooldown,
		startTime,
		endTime,
		imageUrl,
		city,
		country,
		ticketsAvailable,
		category,
		eventType,
	}: {
		name: string;
		description: string;
		pricePerTicket: string;
		platformFeePercentage: number;
		transferFeePercentage: number;
		transferCooldown: number;
		startTime: number;
		endTime: number;
		imageUrl: string;
		city: string;
		country: string;
		ticketsAvailable: number;
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
				(platformFeePercentage),
				(transferFeePercentage),
				(transferCooldown),
				(startTime),
				(endTime),
				imageUrl,
				city,
				country,
				(ticketsAvailable),
				category,
				eventType,
			],
		});
	};

	// Buy Ticket
	const buyTicket = async (campaignId: string, price: string) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "buyTicket",
			value: parseEther(price),
			args: [BigInt(campaignId)],
		});
	};

	// Transfer Ticket
	const transferTicket = async (
		ticketId: bigint,
		to: `0x${string}`,
		amount: string,
	) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "transferTicket",
			value: parseEther(amount),
			args: [ticketId, to],
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
	const useTicket = (ticketId: number) => {
		return useReadContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "getTicket",
			args: [BigInt(ticketId)],
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

	// Redeem Ticket
	const redeemTicket = async (ticketId: bigint) => {
		return writeContract({
			address: TICKETING_SYSTEM_ADDRESS,
			abi: ticketingSystemABI,
			functionName: "redeemTicket",
			args: [ticketId],
		});
	};

	return {
		createCampaign,
		buyTicket,
		transferTicket,
		useCampaign,
		useTicket,
		useCampaignsByPage,
		redeemTicket,
		isConfirmed,
		isConfirming,
	};
}