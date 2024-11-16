// pages/test-contract.tsx
"use client";

import { useTicketingSystem } from "@/lib/useTicketingSystem";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function TestContract() {
	const {
		createCampaign,
		buyTicket,
		createTransfer,
		completeTransfer,
		useCampaign,
		useTicket,
		isConfirming,
		isConfirmed,
	} = useTicketingSystem();

	const { address } = useAccount();
	const [campaignId, setCampaignId] = useState<bigint>();
	const [tokenId, setTokenId] = useState<string>("");
	const [transferId, setTransferId] = useState<string>("");
	const [transferAmount, setTransferAmount] = useState<string>("0.1");

	// Read campaign data if campaignId exists
	const { data: campaign } = useCampaign(Number(campaignId));
	// Read ticket data if tokenId exists
	const { data: ticket } = useTicket(Number(tokenId));

	const handleCreateCampaign = async () => {
		try {
			const timestamp = Math.floor(Date.now() / 1000);
			const tx = await createCampaign({
				name: "Test Event",
				description: "Test Description",
				pricePerTicket: "0.00000001",
				platformFeePercentage: 5,
				transferFeePercentage: 2,
				startDate: timestamp,
				expirationDate: timestamp + 30 * 24 * 60 * 60, // 30 days
				imageUrl: "https://example.com/image.jpg",
				city: "New York",
				country: "USA",
				ticketsAvailable: 100,
				storeId: "store123",
				secretName: "secret123",
				category: "Music",
				eventType: "Concert",
			});

			// Wait for transaction confirmation
			if (tx) {
				setCampaignId(BigInt(1)); // Assuming this is the first campaign
			}
		} catch (error) {
			console.error("Create campaign error:", error);
		}
	};

	const handleBuyTicket = async () => {
		if (!campaignId) return;
		try {
			const tx = await buyTicket(
				campaignId,
				"0.1", // price
				"https://example.com/ticket-image.jpg",
			);

			if (tx) {
				setTokenId("1"); // Assuming this is the first ticket
			}
		} catch (error) {
			console.error("Buy ticket error:", error);
		}
	};

	const handleCreateTransfer = async () => {
		if (!tokenId) return;
		try {
			const tx = await createTransfer(BigInt(tokenId), transferAmount);
			if (tx) {
				setTransferId("1"); // Assuming this is the first transfer
			}
		} catch (error) {
			console.error("Create transfer error:", error);
		}
	};

	const handleCompleteTransfer = async () => {
		if (!transferId) return;
		try {
			await completeTransfer(BigInt(transferId), transferAmount);
		} catch (error) {
			console.error("Complete transfer error:", error);
		}
	};

	return (
		<div className="container mx-auto p-4 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Test Contract Functions</h1>

			{/* Create Campaign Section */}
			<section className="border p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">1. Create Campaign</h2>
				<button
					type="button"
					onClick={handleCreateCampaign}
					className="bg-blue-500 text-white px-4 py-2 rounded"
					disabled={isConfirming}
				>
					{isConfirming ? "Creating..." : "Create Test Campaign"}
				</button>
				{campaignId && (
					<div className="mt-2">
						<p>Campaign Created! ID: {campaignId}</p>
						{campaign && (
							<pre className="bg-gray-100 p-2 mt-2 rounded">
								{JSON.stringify(campaign.storeId, null, 2)}
							</pre>
						)}
					</div>
				)}
			</section>

			{/* Buy Ticket Section */}
			<section className="border p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">2. Buy Ticket</h2>
				<button
					type="button"
					onClick={handleBuyTicket}
					className="bg-green-500 text-white px-4 py-2 rounded"
					disabled={!campaignId || isConfirming}
				>
					{isConfirming ? "Buying..." : "Buy Test Ticket"}
				</button>
				{tokenId && (
					<div className="mt-2">
						<p>Ticket Bought! ID: {tokenId}</p>
						{ticket && (
							<pre className="bg-gray-100 p-2 mt-2 rounded">
								{JSON.stringify(ticket, null, 2)}
							</pre>
						)}
					</div>
				)}
			</section>

			{/* Create Transfer Section */}
			<section className="border p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">3. Create Transfer</h2>
				<div className="flex gap-2 mb-2">
					<input
						type="text"
						value={transferAmount}
						onChange={(e) => setTransferAmount(e.target.value)}
						className="border p-2 rounded"
						placeholder="Transfer Amount (ETH)"
					/>
				</div>
				<button
					type="button"
					onClick={handleCreateTransfer}
					className="bg-purple-500 text-white px-4 py-2 rounded"
					disabled={!tokenId || isConfirming}
				>
					{isConfirming ? "Creating Transfer..." : "Create Transfer"}
				</button>
				{transferId && (
					<p className="mt-2">Transfer Created! ID: {transferId}</p>
				)}
			</section>

			{/* Complete Transfer Section */}
			<section className="border p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">4. Complete Transfer</h2>
				<button
					type="button"
					onClick={handleCompleteTransfer}
					className="bg-yellow-500 text-white px-4 py-2 rounded"
					disabled={!transferId || isConfirming}
				>
					{isConfirming ? "Completing..." : "Complete Transfer"}
				</button>
			</section>

			{/* Status Display */}
			<section className="border p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">Status</h2>
				<p>Connected Address: {address}</p>
				<p>
					Transaction Status:{" "}
					{isConfirming ? "Confirming..." : isConfirmed ? "Confirmed" : "Ready"}
				</p>
			</section>
		</div>
	);
}
