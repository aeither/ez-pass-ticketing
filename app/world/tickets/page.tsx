"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Ticket {
	ticketId: bigint;
	campaignId: bigint;
	owner: string;
	isValid: boolean;
	purchaseDate: bigint;
}

interface RedeemStatus {
	isRedeeming: boolean;
	error: string | null;
	success: boolean;
}

// Mock data
const mockTickets: Ticket[] = [
	{
		ticketId: BigInt(699),
		campaignId: BigInt(89),
		owner: "0x07540e373bc08d7cd5ea75da94dd25b1a618b06c",
		isValid: false,
		purchaseDate: BigInt(1637549000),
	},
	{
		ticketId: BigInt(919),
		campaignId: BigInt(13),
		owner: "0xc658ea95c8a1454b2bb6a0d044a143e2f802d9af",
		isValid: true,
		purchaseDate: BigInt(1647990000),
	},
	{
		ticketId: BigInt(555),
		campaignId: BigInt(94),
		owner: "0x83addf2bdaeeb4c3dba9cdabac00855e899e5fcd",
		isValid: false,
		purchaseDate: BigInt(1667847000),
	},
	{
		ticketId: BigInt(311),
		campaignId: BigInt(77),
		owner: "0xa33f34083517c4133b0affc8c2d34bbd7c4f3002",
		isValid: true,
		purchaseDate: BigInt(1656786000),
	},
	{
		ticketId: BigInt(356),
		campaignId: BigInt(82),
		owner: "0x68c3efcc34e3e48d89390eb6e7a5546cca1389fb",
		isValid: false,
		purchaseDate: BigInt(1662850000),
	},
];

const mockUserDetails = {
	username: "JohnDoe",
	walletAddress: "0x07540e373bc08d7cd5ea75da94dd25b1a618b06c",
};

export default function MyTicketsPage() {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
	const [userDetails, setUserDetails] = useState({
		username: "",
		walletAddress: "",
	});
	const [redeemStatus, setRedeemStatus] = useState<RedeemStatus>({
		isRedeeming: false,
		error: null,
		success: false,
	});

	const fetchUserTickets = async (address: string) => {
		setIsLoading(true);
		setError(null);

		try {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Use mock data instead of actual API call
			setTickets(mockTickets);
		} catch (err) {
			console.error("Error fetching user tickets:", err);
			setError("Failed to load tickets. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRedeemTicket = async (ticket: Ticket) => {
		if (!ticket.isValid) {
			setRedeemStatus({
				isRedeeming: false,
				error: "This ticket has already been used",
				success: false,
			});
			return;
		}

		setRedeemStatus({ isRedeeming: true, error: null, success: false });

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Update ticket status locally
			setTickets(
				tickets.map((t) =>
					t.ticketId === ticket.ticketId ? { ...t, isValid: false } : t,
				),
			);

			setRedeemStatus({ isRedeeming: false, error: null, success: true });

			// Close modal after successful redemption
			setTimeout(() => {
				setSelectedTicket(null);
				setRedeemStatus({ isRedeeming: false, error: null, success: false });
			}, 2000);
		} catch (error) {
			setRedeemStatus({
				isRedeeming: false,
				error: "Failed to redeem ticket. Please try again.",
				success: false,
			});
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Simulate MiniKit user data
		setUserDetails(mockUserDetails);
		fetchUserTickets(mockUserDetails.walletAddress);
	}, []);

	const formatDate = (timestamp: bigint) => {
		return new Date(Number(timestamp) * 1000).toLocaleString();
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
			<Header />
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

								{/* Add status messages */}
								{redeemStatus.error && (
									<p className="text-red-600 mt-2">{redeemStatus.error}</p>
								)}
								{redeemStatus.success && (
									<p className="text-green-600 mt-2">
										Ticket successfully redeemed!
									</p>
								)}

								{/* Action buttons */}
								<div className="flex gap-2 mt-4">
									<Button
										onClick={() => setSelectedTicket(null)}
										variant="outline"
									>
										Close
									</Button>

									<Button
										onClick={() => handleRedeemTicket(selectedTicket)}
										disabled={
											!selectedTicket.isValid || redeemStatus.isRedeeming
										}
										className={`${
											!selectedTicket.isValid
												? "opacity-50 cursor-not-allowed"
												: ""
										}`}
									>
										{redeemStatus.isRedeeming ? (
											<div className="flex items-center gap-2">
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
												Redeeming...
											</div>
										) : (
											"Redeem Ticket"
										)}
									</Button>
								</div>
							</div>
						</Card>
					</div>
				)}
			</main>
		</div>
	);
}