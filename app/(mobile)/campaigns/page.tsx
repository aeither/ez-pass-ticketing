"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTicketingSystem } from "@/lib/useTicketingSystem";
import { ArrowLeft, ArrowRight, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

interface Campaign {
	campaignId: string;
	name: string;
	description: string;
	pricePerTicket: string;
	ticketsAvailable: string;
}

export default function CampaignsPage() {
	const { address } = useAccount();
	const {
		buyTicket,
		useCampaign,
		useCampaignsByPage,
		getUserTickets,
		isConfirming,
	} = useTicketingSystem();

	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 6;
	const { data: campaigns, isLoading } = useCampaignsByPage(
		currentPage,
		pageSize,
	);
	const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
	const { data: campaign } = useCampaign(selectedCampaign || 0);
	const [userTickets, setUserTickets] = useState<any[]>([]);

	useEffect(() => {
		const fetchUserTickets = async () => {
			if (!address) return;
			try {
				const tickets = await getUserTickets(address);
				setUserTickets(tickets as any);
			} catch (error: any) {
				toast.error("Failed to fetch user tickets");
			}
		};

		fetchUserTickets();
	}, [address, getUserTickets]);

	const handleBuyTicket = async (campaignId: string) => {
		if (!campaign?.pricePerTicket) {
			toast.error("Invalid ticket price");
			return;
		}

		try {
			const tx = await buyTicket(
				BigInt(campaignId),
				campaign.pricePerTicket.toString(),
				"ticket-image.jpg", // You might want to handle image upload
			);

			if (tx) {
				toast.success("Ticket purchased successfully");
				// Refresh user tickets after purchase
				if (address) {
					const tickets = await getUserTickets(address);
					setUserTickets(tickets as any);
				}
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to purchase ticket");
		}
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card className="bg-background">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">
							Loading campaigns...
						</CardTitle>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="bg-background">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center sm:text-left">
						Available Events
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{campaigns?.map((campaign: any) => (
							<Card
								key={campaign.campaignId.toString()}
								className="flex flex-col justify-between"
							>
								<CardHeader>
									<CardTitle className="text-xl">{campaign.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										{campaign.description}
									</p>
									<div className="space-y-2 text-sm">
										<p className="flex justify-between">
											<span>Price:</span>
											<span className="font-medium">
												{formatEther(campaign.pricePerTicket)} ETH
											</span>
										</p>
										<p className="flex justify-between">
											<span>Available Tickets:</span>
											<span className="font-medium">
												{campaign.ticketsAvailable.toString()}
											</span>
										</p>
									</div>
								</CardContent>
								<CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2">
									<Button
										onClick={() =>
											setSelectedCampaign(Number(campaign.campaignId))
										}
										variant="outline"
										className="w-full sm:w-auto"
									>
										View Details
									</Button>
									<Button
										onClick={() =>
											handleBuyTicket(campaign.campaignId.toString())
										}
										className="w-full sm:w-auto"
										disabled={isConfirming}
									>
										<Ticket className="mr-2 h-4 w-4" />
										{isConfirming ? "Confirming..." : "Buy Ticket"}
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between mt-6">
					<Button
						onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
						disabled={currentPage === 0}
						variant="outline"
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Previous
					</Button>
					<Button
						onClick={() => setCurrentPage((p) => p + 1)}
						disabled={!campaigns || campaigns.length < pageSize}
						variant="outline"
					>
						Next <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
