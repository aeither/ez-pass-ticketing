"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Campaign {
	campaignId: string;
	name: string;
	description: string;
	pricePerTicket: string;
	ticketsAvailable: string;
}

const mockCampaigns: Campaign[] = [
	{
		campaignId: "1",
		name: "Web3 Conference 2024",
		description:
			"Join the biggest Web3 conference in Asia featuring top speakers and networking opportunities",
		pricePerTicket: "50000000000000000", // 0.05 ETH
		ticketsAvailable: "100",
	},
	{
		campaignId: "2",
		name: "NFT Art Exhibition",
		description:
			"Exclusive digital art showcase featuring renowned NFT artists and collectors",
		pricePerTicket: "100000000000000000", // 0.1 ETH
		ticketsAvailable: "50",
	},
	{
		campaignId: "3",
		name: "DeFi Summit",
		description:
			"Deep dive into the latest DeFi protocols and yield farming strategies",
		pricePerTicket: "75000000000000000", // 0.075 ETH
		ticketsAvailable: "75",
	},
];

export default function CampaignsPage() {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const pageSize = 6;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setCampaigns(mockCampaigns);
			} catch (error) {
				toast.error("Failed to fetch campaigns", {
					description: "Please try again later",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchCampaigns();
	}, [toast]);

	const handleBuyTicket = async (campaignId: string) => {
		try {
			// Simulate transaction
			await new Promise((resolve) => setTimeout(resolve, 1500));
			toast.success(`Successfully purchased ticket for campaign ${campaignId}`);
		} catch (error) {
			toast.error("Failed to purchase ticket");
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
						{campaigns.map((campaign) => (
							<Card
								key={campaign.campaignId}
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
												{Number(campaign.pricePerTicket) / 1e18} ETH
											</span>
										</p>
										<p className="flex justify-between">
											<span>Available Tickets:</span>
											<span className="font-medium">
												{Number(campaign.ticketsAvailable)}
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
										onClick={() => handleBuyTicket(campaign.campaignId)}
										className="w-full sm:w-auto"
									>
										<Ticket className="mr-2 h-4 w-4" /> Buy Ticket
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
