"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCcw, Send, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TicketType {
	ticketIndex: number;
	campaignId: number;
	purchaseDate: number;
	imageUrl?: string;
	eventName: string;
}

const mockTickets: TicketType[] = [
	{
		ticketIndex: 1,
		campaignId: 1,
		purchaseDate: Math.floor(Date.now() / 1000) - 86400, // yesterday
		eventName: "Web3 Conference 2024",
		imageUrl:
			"https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop",
	},
	{
		ticketIndex: 2,
		campaignId: 2,
		purchaseDate: Math.floor(Date.now() / 1000) - 172800, // 2 days ago
		eventName: "NFT Art Exhibition",
		imageUrl:
			"https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&auto=format&fit=crop",
	},
	{
		ticketIndex: 3,
		campaignId: 3,
		purchaseDate: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
		eventName: "DeFi Summit",
		imageUrl:
			"https://images.unsplash.com/photo-1638913662252-70efce1e60a7?w=800&auto=format&fit=crop",
	},
];

export default function TicketsPage() {
	const [userTickets, setUserTickets] = useState<TicketType[]>([]);
	const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchUserTickets();
	}, []);

	const fetchUserTickets = async () => {
		setIsLoading(true);
		try {
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setUserTickets(mockTickets);
			toast.success("Tickets refreshed successfully");
		} catch (error) {
			toast.error("Failed to fetch tickets");
		} finally {
			setIsLoading(false);
		}
	};

	const handleTransfer = async (ticket: TicketType) => {
		try {
			// Simulate transfer transaction
			await new Promise((resolve) => setTimeout(resolve, 1500));
			toast.success(
				`Transfer process started for Ticket #${ticket.ticketIndex}`,
			);
		} catch (error) {
			toast.error("Could not transfer the ticket");
		}
	};

	const handleUse = async (ticket: TicketType) => {
		try {
			// Simulate usage transaction
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success(`Ticket #${ticket.ticketIndex} has been used`);
		} catch (error) {
			toast.error("Could not use the ticket");
		}
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<Card className="w-full max-w-md mx-auto">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-2xl font-bold">My Tickets</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={fetchUserTickets}
							disabled={isLoading}
						>
							<RefreshCcw
								className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
							/>
							<span className="sr-only">Refresh Tickets</span>
						</Button>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[400px] w-full pr-4">
							{isLoading ? (
								<div className="flex items-center justify-center h-full">
									<p className="text-muted-foreground">Loading tickets...</p>
								</div>
							) : userTickets.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full space-y-4">
									<Ticket className="h-12 w-12 text-muted-foreground" />
									<p className="text-muted-foreground">No tickets found</p>
								</div>
							) : (
								userTickets.map((ticket) => (
									<Card
										key={ticket.ticketIndex}
										className={`mb-4 hover:shadow-md transition-shadow ${
											selectedTicket?.ticketIndex === ticket.ticketIndex
												? "border-2 border-primary"
												: ""
										}`}
										onClick={() => setSelectedTicket(ticket)}
									>
										<CardContent className="p-4">
											<div className="flex items-center space-x-4">
												<div className="flex-shrink-0">
													{ticket.imageUrl ? (
														<img
															src={ticket.imageUrl}
															alt={ticket.eventName}
															className="h-12 w-12 rounded-full object-cover"
														/>
													) : (
														<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
															<Ticket className="h-6 w-6 text-muted-foreground" />
														</div>
													)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium truncate">
														{ticket.eventName}
													</p>
													<p className="text-sm text-muted-foreground truncate">
														Ticket #{ticket.ticketIndex}
													</p>
													<p className="text-sm text-muted-foreground truncate">
														{new Date(
															ticket.purchaseDate * 1000,
														).toLocaleDateString()}
													</p>
												</div>
											</div>
										</CardContent>
										<CardFooter className="flex justify-between p-4 pt-0">
											<Button
												variant="outline"
												size="sm"
												onClick={(e) => {
													e.stopPropagation();
													handleTransfer(ticket);
												}}
											>
												<Send className="h-4 w-4 mr-2" />
												Transfer
											</Button>
											<Button
												variant="default"
												size="sm"
												onClick={(e) => {
													e.stopPropagation();
													handleUse(ticket);
												}}
											>
												<Ticket className="h-4 w-4 mr-2" />
												Use
											</Button>
										</CardFooter>
									</Card>
								))
							)}
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</>
	);
}