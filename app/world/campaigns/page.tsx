// app/campaigns/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { abi as ticketingSystemABI } from "@/lib/abi";
import { TICKETING_SYSTEM_ADDRESS } from "@/lib/constants";
import { readClient } from "@/lib/readClient";

interface Campaign {
	campaignId: bigint;
	name: string;
	description: string;
	pricePerTicket: bigint;
	ticketsAvailable: bigint;
	// Add other fields as needed
}

export default function CampaignsPage() {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

	const pageSize = 10; // Number of campaigns per page

	const fetchCampaigns = async (pageNumber: number) => {
		setIsLoading(true);
		setError(null);

		try {
			const data = (await readClient.readContract({
				address: TICKETING_SYSTEM_ADDRESS,
				abi: ticketingSystemABI,
				functionName: "getCampaignsByPage",
				args: [BigInt(pageNumber), BigInt(pageSize)],
			})) as unknown as Campaign[];

			setCampaigns(data);
		} catch (err) {
			console.error("Error fetching campaigns:", err);
			setError("Failed to load campaigns. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCampaigns(currentPage);
	}, [currentPage]);

	return (
		<main className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">Event Campaigns</h1>

			{isLoading && (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
				</div>
			)}

			{error && (
				<Card className="p-6 bg-red-50">
					<p className="text-red-600">{error}</p>
				</Card>
			)}

			{!isLoading && !error && (
				<Card className="p-6">
					<h2 className="text-2xl font-semibold mb-4">Available Events</h2>
					<div className="space-y-4">
						{campaigns.length > 0 ? (
							<>
								{campaigns.map((campaign) => (
									<Card key={String(campaign.campaignId)} className="p-4">
										<h3 className="text-xl font-semibold">{campaign.name}</h3>
										<p className="text-gray-600">{campaign.description}</p>
										<div className="mt-2">
											<p>
												Price:{" "}
												{campaign.pricePerTicket
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
									<span className="flex items-center">
										Page {currentPage + 1}
									</span>
									<Button
										onClick={() => setCurrentPage((p) => p + 1)}
										disabled={campaigns.length < pageSize}
									>
										Next
									</Button>
								</div>
							</>
						) : (
							<p className="text-center text-gray-500">No campaigns found</p>
						)}
					</div>
				</Card>
			)}

			{selectedCampaign !== null && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<Card className="p-6 max-w-lg w-full">
						<h2 className="text-2xl font-semibold mb-4">
							Campaign Details #{selectedCampaign}
						</h2>
						{/* Add more detailed information here */}
						<Button
							onClick={() => setSelectedCampaign(null)}
							className="mt-4"
							variant="outline"
						>
							Close
						</Button>
					</Card>
				</div>
			)}
		</main>
	);
}
