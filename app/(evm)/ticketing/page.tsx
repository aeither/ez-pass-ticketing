"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTicketingSystem } from "@/lib/useTicketingSystem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export default function EventsPage() {
	const { address } = useAccount();
	const {
		createCampaign,
		buyTicket,
		createTransfer,
		completeTransfer,
		useCampaign,
		useTicket,
		useCampaignsByPage,
		getUserTickets,
		isConfirming,
		isConfirmed,
	} = useTicketingSystem();

	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 5;
	const { data: campaigns } = useCampaignsByPage(currentPage, pageSize);
	const [selectedCampaign, setSelectedCampaign] = useState<number>(0);
	const { data: campaign } = useCampaign(selectedCampaign);

	const [tokenId, setTokenId] = useState<string>("");
	const [transferId, setTransferId] = useState<string>("");
	const [transferAmount, setTransferAmount] = useState<string>("0.1");
	const { data: ticket } = useTicket(Number(tokenId));
	const [userTickets, setUserTickets] = useState<any[]>([]);
	const [selectedTicket, setSelectedTicket] = useState<any>(null);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		pricePerTicket: "0.00001",
		platformFeePercentage: 5,
		transferFeePercentage: 2,
		imageUrl: "image.jpg",
		city: "",
		country: "",
		ticketsAvailable: 100,
		category: "",
		eventType: "",
		storeId: "store123",
		secretName: "secret123",
	});

	const fetchUserTickets = async () => {
		if (!address) return;
		try {
			const tickets = await getUserTickets(address);
			console.log("🚀 ~ fetchUserTickets ~ tickets:", tickets);
			setUserTickets(tickets);
		} catch (error: any) {
			toast.error("Failed to fetch user tickets");
		}
	};

	const handleCreateCampaign = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const timestamp = Math.floor(Date.now() / 1000);
			await createCampaign({
				...formData,
				startDate: timestamp,
				expirationDate: timestamp + 30 * 24 * 60 * 60,
				pricePerTicket: (Number(formData.pricePerTicket) * 1e18).toString(),
			});
			toast.success("Campaign created successfully");
		} catch (error: any) {
			console.error("Error creating campaign:", error);
			toast.error(error.message || "Failed to create campaign");
		}
	};

	const handleBuyTicket = async (campaignId: string) => {
		if (!campaign?.pricePerTicket) {
			toast.error("Invalid ticket price");
			return;
		}

		try {
			const tx = await buyTicket(
				campaignId,
				campaign.pricePerTicket.toString(),
				"test-image.jpg",
			);
			if (tx) {
				setTokenId(tx.toString());
				toast.success("Ticket purchased successfully");
				fetchUserTickets();
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to buy ticket");
		}
	};

	const handleCreateTransfer = async () => {
		if (!selectedTicket) return;
		try {
			const tx = await createTransfer(BigInt(1), transferAmount);
			// const tx = await createTransfer(
			// 	BigInt(selectedTicket.ticketIndex),
			// 	transferAmount,
			// );
			if (tx) {
				setTransferId(tx.toString());
				toast.success("Transfer created successfully");
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to create transfer");
		}
	};

	const handleCompleteTransfer = async () => {
		if (!transferId) return;
		try {
			await completeTransfer(BigInt(transferId), transferAmount);
			toast.success("Transfer completed successfully");
			fetchUserTickets();
		} catch (error: any) {
			toast.error(error.message || "Failed to complete transfer");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Event Ticketing System</h1>
				<ConnectButton />
			</div>

			{address && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Card className="p-6">
						<h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
						<form onSubmit={handleCreateCampaign} className="space-y-4">
							<Input
								placeholder="Event Name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								required
							/>
							<Textarea
								placeholder="Event Description"
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								required
							/>
							<Input
								type="number"
								step="0.00001"
								placeholder="Price per Ticket (ETH)"
								value={formData.pricePerTicket}
								onChange={(e) =>
									setFormData({ ...formData, pricePerTicket: e.target.value })
								}
								required
							/>
							<div className="grid grid-cols-2 gap-4">
								<Input
									placeholder="City"
									value={formData.city}
									onChange={(e) =>
										setFormData({ ...formData, city: e.target.value })
									}
									required
								/>
								<Input
									placeholder="Country"
									value={formData.country}
									onChange={(e) =>
										setFormData({ ...formData, country: e.target.value })
									}
									required
								/>
							</div>
							<Input
								placeholder="Category"
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
								required
							/>
							<Input
								placeholder="Event Type"
								value={formData.eventType}
								onChange={(e) =>
									setFormData({ ...formData, eventType: e.target.value })
								}
								required
							/>
							<Button type="submit" disabled={isConfirming}>
								{isConfirming ? "Creating..." : "Create Event"}
							</Button>
						</form>
					</Card>

					<Card className="p-6">
						<h2 className="text-2xl font-semibold mb-4">Available Events</h2>
						<div className="space-y-4">
							{campaigns?.map((campaign: any) => (
								<Card key={campaign.campaignId} className="p-4">
									<h3 className="text-xl font-semibold">{campaign.name}</h3>
									<p className="text-gray-600">{campaign.description}</p>
									<div className="mt-2">
										<p>
											Price:{" "}
											{campaign?.pricePerTicket
												? Number(campaign.pricePerTicket) / 1e18
												: 0}{" "}
											ETH
										</p>
										<p>
											Available Tickets: {Number(campaign.ticketsAvailable)}
										</p>
										<Button
											onClick={() => {
												setSelectedCampaign(Number(campaign.campaignId));
											}}
											variant="outline"
											className="mt-2"
										>
											View Details
										</Button>
									</div>
								</Card>
							))}
							<div className="flex justify-between mt-4">
								<Button
									onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
									disabled={currentPage === 0}
								>
									Previous
								</Button>
								<Button
									onClick={() => setCurrentPage((p) => p + 1)}
									disabled={!campaigns || campaigns.length < pageSize}
								>
									Next
								</Button>
							</div>
						</div>
					</Card>

					{campaign && (
						<Card className="p-6 col-span-2">
							<h2 className="text-2xl font-semibold mb-4">Event Details</h2>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="font-semibold">Name:</h3>
									<p>{campaign.name}</p>
								</div>
								<div>
									<h3 className="font-semibold">Price:</h3>
									<p>{Number(campaign.pricePerTicket) / 1e18} ETH</p>
								</div>
								<div>
									<h3 className="font-semibold">Location:</h3>
									<p>
										{campaign.city}, {campaign.country}
									</p>
								</div>
								<div>
									<h3 className="font-semibold">Category:</h3>
									<p>{campaign.category}</p>
								</div>
								<div className="col-span-2">
									<Button
										onClick={() => handleBuyTicket(campaign.campaignId)}
										disabled={isConfirming}
									>
										{isConfirming ? "Processing..." : "Buy Ticket"}
									</Button>
								</div>
							</div>
						</Card>
					)}

					<Card className="p-6 col-span-2">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-semibold">My Tickets</h2>
							<Button onClick={fetchUserTickets}>Refresh Tickets</Button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{userTickets.map((ticket, index) => (
								<Card
									key={index}
									className={`p-4 cursor-pointer ${
										selectedTicket?.ticketIndex === ticket.ticketIndex
											? "border-2 border-primary"
											: ""
									}`}
									onClick={() => setSelectedTicket(ticket)}
								>
									<div className="space-y-2">
										<p className="font-semibold">
											Ticket #{ticket.ticketIndex}
										</p>
										<p>Campaign ID: {ticket.campaignId.toString()}</p>
										<p>
											Purchase Date:{" "}
											{new Date(
												Number(ticket.purchaseDate) * 1000,
											).toLocaleDateString()}
										</p>
										{ticket.imageUrl && (
											<img
												src={ticket.imageUrl}
												alt="Ticket"
												className="w-full h-32 object-cover rounded"
											/>
										)}
									</div>
								</Card>
							))}
						</div>
					</Card>

					{selectedTicket && (
						<Card className="p-6 col-span-2">
							<h2 className="text-2xl font-semibold mb-4">
								Transfer Ticket #{selectedTicket.ticketIndex}
							</h2>
							<div className="space-y-4">
								<div className="flex gap-4">
									<Input
										type="text"
										value={transferAmount}
										onChange={(e) => setTransferAmount(e.target.value)}
										placeholder="Transfer Amount (ETH)"
									/>
									<Button
										onClick={() => handleCreateTransfer()}
										disabled={isConfirming}
									>
										{isConfirming ? "Creating..." : "Create Transfer"}
									</Button>
								</div>
								{transferId && (
									<Button
										onClick={handleCompleteTransfer}
										disabled={isConfirming}
									>
										{isConfirming ? "Completing..." : "Complete Transfer"}
									</Button>
								)}
							</div>
						</Card>
					)}

					<Card className="p-6 col-span-2">
						<h2 className="text-xl font-semibold mb-4">Transaction Status</h2>
						<p>Connected Address: {address}</p>
						<p>
							Status:{" "}
							{isConfirming
								? "Confirming..."
								: isConfirmed
									? "Confirmed"
									: "Ready"}
						</p>
					</Card>
				</div>
			)}
		</div>
	);
}
