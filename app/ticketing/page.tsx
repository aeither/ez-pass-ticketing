"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useTicketingSystem } from "../lib/useTicketingSystem";

export default function EventsPage() {
	const { address } = useAccount();
	const {
		createCampaign,
		buyTicket,
		useCampaign,
		useCampaignsByPage,
		isConfirming,
	} = useTicketingSystem();

	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 5;
	const { data: campaigns } = useCampaignsByPage(currentPage, pageSize);
	const [selectedCampaign, setSelectedCampaign] = useState<number>(0);
	const { data: campaign } = useCampaign(selectedCampaign);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		pricePerTicket: "0.05",
		platformFeePercentage: 5,
		transferFeePercentage: 10,
		transferCooldown: 24,
		imageUrl: "https://example.com/image.jpg",
		city: "",
		country: "",
		ticketsAvailable: 100,
		category: "",
		eventType: "",
	});

	const handleCreateCampaign = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createCampaign({
				...formData,
				startTime: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
				endTime: Math.floor(Date.now() / 1000) + 864000, // 10 days from now
			});
		} catch (error: any) {
			console.error("Error creating campaign:", error);
			toast.error(error.message || "Failed to create campaign");
		}
	};

	const handleBuyTicket = async (campaignId: string, price: string) => {
		try {
			await buyTicket(campaignId, price);
		} catch (error: any) {
			toast.error(error.message || "Failed to buy ticket");
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
					{/* Create Campaign Form */}
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
								step="0.01"
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

					{/* Available Campaigns */}
					<Card className="p-6">
						<h2 className="text-2xl font-semibold mb-4">Available Events</h2>
						<div className="space-y-4">
							{campaigns?.map((campaign: any) => (
								<Card key={campaign.campaignId} className="p-4">
									<h3 className="text-xl font-semibold">{campaign.name}</h3>
									<p className="text-gray-600">{campaign.description}</p>
									<div className="mt-2">
										<p>Price: {Number(campaign.pricePerTicket) / 1e18} ETH</p>
										<p>
											Available Tickets: {Number(campaign.ticketsAvailable)}
										</p>
										<Button
											onClick={() =>
												setSelectedCampaign(Number(campaign.campaignId))
											}
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

					{/* Selected Campaign Details */}
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
										onClick={() =>
											handleBuyTicket(
												campaign.storeId.toString(),
												(Number(campaign.pricePerTicket) / 1e18).toString(),
											)
										}
										disabled={isConfirming}
									>
										{isConfirming ? "Processing..." : "Buy Ticket"}
									</Button>
								</div>
							</div>
						</Card>
					)}
				</div>
			)}
		</div>
	);
}