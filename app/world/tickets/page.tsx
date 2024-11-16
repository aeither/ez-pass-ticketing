// app/my-tickets/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MiniKit } from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";

import { abi as ticketingSystemABI } from "@/lib/abi";
import { TICKETING_SYSTEM_ADDRESS } from "@/lib/constants";
import { readClient } from "@/lib/readClient";

interface Ticket {
	ticketId: bigint;
	campaignId: bigint;
	owner: string;
	isValid: boolean;
	purchaseDate: bigint;
	// Add other ticket fields as needed
}

export default function MyTicketsPage() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [userDetails, setUserDetails] = useState({
		username: "",
		walletAddress: "",
	});

	const fetchUserTickets = async (address: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const data = (await readClient.readContract({
                address: TICKETING_SYSTEM_ADDRESS,
                abi: ticketingSystemABI,
                functionName: "getUserTickets",
                args: [address as `0x${string}`],
            })) as unknown as Ticket[];

			setTickets(data);
		} catch (err) {
			console.error("Error fetching user tickets:", err);
			setError("Failed to load tickets. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Update user details when component mounts
		if (MiniKit.user) {
			const userWallet = MiniKit.user.walletAddress;
			setUserDetails({
				username: MiniKit.user.username || "Not connected",
				walletAddress: userWallet || "Not connected",
			});

			if (userWallet) {
				fetchUserTickets(userWallet);
			}
		}
	}, []);

	const formatDate = (timestamp: bigint) => {
		return new Date(Number(timestamp) * 1000).toLocaleString();
	};

	return (
		<main className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">My Tickets</h1>

			{/* User Details Card */}
			<Card className="p-4 mb-8">
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<span className="font-semibold">Username:</span>
						<span className="text-gray-700">{userDetails.username}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-semibold">Wallet:</span>
						<span className="text-gray-700 truncate max-w-[200px]">
							{userDetails.walletAddress}
						</span>
					</div>
				</div>
			</Card>

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
					<h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
					<div className="space-y-4">
						{tickets.length > 0 ? (
							tickets.map((ticket) => (
								<Card key={String(ticket.ticketId)} className="p-4">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-xl font-semibold">
												Ticket #{String(ticket.ticketId)}
											</h3>
											<p className="text-gray-600">
												Campaign ID: {String(ticket.campaignId)}
											</p>
											<p className="text-sm text-gray-500">
												Purchased: {formatDate(ticket.purchaseDate)}
											</p>
											<div className="mt-2">
												<span
													className={`px-2 py-1 rounded-full text-sm ${
														ticket.isValid
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
												>
													{ticket.isValid ? "Valid" : "Used"}
												</span>
											</div>
										</div>
										<Button
											onClick={() => setSelectedTicket(ticket)}
											variant="outline"
										>
											View Details
										</Button>
									</div>
								</Card>
							))
						) : (
							<p className="text-center text-gray-500">No tickets found</p>
						)}
					</div>
				</Card>
			)}

			{/* Ticket Details Modal */}
			{selectedTicket && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<Card className="p-6 max-w-lg w-full">
						<h2 className="text-2xl font-semibold mb-4">
							Ticket Details #{String(selectedTicket.ticketId)}
						</h2>
						<div className="space-y-2">
							<p>
								<span className="font-semibold">Campaign ID:</span>{" "}
								{String(selectedTicket.campaignId)}
							</p>
							<p>
								<span className="font-semibold">Purchase Date:</span>{" "}
								{formatDate(selectedTicket.purchaseDate)}
							</p>
							<p>
								<span className="font-semibold">Status:</span>{" "}
								<span
									className={`px-2 py-1 rounded-full text-sm ${
										selectedTicket.isValid
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}
								>
									{selectedTicket.isValid ? "Valid" : "Used"}
								</span>
							</p>
							<p>
								<span className="font-semibold">Owner:</span>{" "}
								<span className="break-all">{selectedTicket.owner}</span>
							</p>
						</div>
						<Button
							onClick={() => setSelectedTicket(null)}
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