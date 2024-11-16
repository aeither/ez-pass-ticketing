// app/create-campaign/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { abi as ticketingSystemABI } from "@/lib/abi";
import { abi } from "@/lib/abiCounter";
import { TICKETING_SYSTEM_ADDRESS } from "@/lib/constants";
import {
	MiniKit,
	VerificationLevel,
	type VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem"; // You can still use viem for parsing

const COUNTER_ADDRESS = "0xA2DD26D1e1b87975692ab9efdD84177BC16fcA98"; // mainnnet

const BASE_EXPLORER_URL = "https://worldscan.org";

export default function CreateCampaignPage() {
	const [isVerifying, setIsVerifying] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const verifyPayload: VerifyCommandInput = {
		action: "buyer-unique",
		signal: "0x12312",
		verification_level: VerificationLevel.Orb,
	};

	const handleVerify = async () => {
		try {
			setIsVerifying(true);

			if (!MiniKit.isInstalled()) {
				toast.error("Please install World App to continue");
				return;
			}

			const { finalPayload } =
				await MiniKit.commandsAsync.verify(verifyPayload);

			if (finalPayload.status === "error") {
				toast.error("Verification failed. Please try again.");
				console.error("Error payload", finalPayload);
				return;
			}

			const verifyResponse = await fetch("/api/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					payload: finalPayload,
					action: "buyer-unique",
					signal: "0x12312",
				}),
			});

			const verifyResponseJson = await verifyResponse.json();

			toast(JSON.stringify(verifyResponseJson.status));

			if (verifyResponseJson.status === 200) {
				setIsVerified(true);
				toast.success("Verification successful!");
			} else {
				toast.error("Verification failed. Please try again.");
			}
		} catch (error) {
			console.error("Verification error:", error);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setIsVerifying(false);
		}
	};

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		pricePerTicket: "",
		platformFeePercentage: 5,
		transferFeePercentage: 2,
		startDate: "",
		expirationDate: "",
		imageUrl: "",
		city: "",
		country: "",
		ticketsAvailable: 100,
		storeId: "",
		secretName: "",
		category: "",
		eventType: "",
	});

	const [userDetails, setUserDetails] = useState({
		username: "",
		walletAddress: "",
	});

	useEffect(() => {
		if (MiniKit.user) {
			setUserDetails({
				username: MiniKit.user.username || "Not connected",
				walletAddress: MiniKit.user.walletAddress || "Not connected",
			});
		}
	}, []);

	const createCampaign = async () => {
		if (!MiniKit.isInstalled()) {
			alert("Please install MiniKit");
			return;
		}

		try {
			const startTimestamp = new Date(formData.startDate).getTime() / 1000;
			const expirationTimestamp =
				new Date(formData.expirationDate).getTime() / 1000;

			const { commandPayload, finalPayload } =
				await MiniKit.commandsAsync.sendTransaction({
					transaction: [
						{
							address: TICKETING_SYSTEM_ADDRESS,
							abi: ticketingSystemABI,
							functionName: "createCampaign",
							args: [
								"Test Event", // name
								"Description", // description
								parseEther("0.0000001"), // pricePerTicket
								5, // platformFeePercentage
								2, // transferFeePercentage
								startTimestamp, // startDate
								expirationTimestamp, // expirationDate
								"image.jpg", // imageUrl
								"New York", // city
								"USA", // country
								100, // ticketsAvailable
								"store123", // storeId
								"secret123", // secretName
								"Music", // category
								"Concert", // eventType
							],
						},
					],
				});

			console.log("Campaign created:", finalPayload);
			alert("Campaign created successfully!");
		} catch (error) {
			console.error("Error:", error);
			alert("Failed to create campaign");
		}
	};

	const callContract = async () => {
		if (!MiniKit.isInstalled()) {
			alert("Please install MiniKit");
			return;
		}

		try {
			const { commandPayload, finalPayload } =
				await MiniKit.commandsAsync.sendTransaction({
					transaction: [
						{
							address: COUNTER_ADDRESS,
							abi: abi,
							functionName: "increment",
							args: [],
						},
					],
				});
			console.log("Transaction sent:", finalPayload);
			window.location.href = '/';
		} catch (error) {
			console.error("Error:", error);
			alert("Transaction failed");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
			{!isVerified ? (
				<Card>
					<CardHeader>
						<CardTitle>Worldcoin Verification</CardTitle>
						<CardDescription>
							Verify your identity using World ID to continue
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{isVerified ? (
							<div className="flex flex-col items-center gap-4 p-4">
								<div className="text-green-600 font-medium">
									✅ Successfully verified with World ID
								</div>
								{/* Add your post-verification content here */}
							</div>
						) : (
							<div className="flex flex-col items-center gap-4">
								<Button
									onClick={handleVerify}
									disabled={isVerifying}
									className="w-full max-w-sm"
								>
									{isVerifying ? (
										<div className="flex items-center gap-2">
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
											Verifying...
										</div>
									) : (
										"Verify with World ID"
									)}
								</Button>
								<p className="text-sm text-muted-foreground text-center">
									You&apos;ll need to have World App installed to complete the
									verification
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			) : (
				<>
					<h1 className="text-4xl font-bold mb-8">Create Campaign</h1>

					{/* User Details Card */}
					<div className="bg-gray-100 p-4 rounded-lg mb-8 w-full max-w-md">
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
					</div>

					{/* Form */}
					<div className="w-full max-w-2xl space-y-4">
						<input
							type="text"
							name="name"
							placeholder="Event Name"
							value={formData.name}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="description"
							placeholder="Description"
							value={formData.description}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="pricePerTicket"
							placeholder="Price Per Ticket (in ETH)"
							value={formData.pricePerTicket}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="datetime-local"
							name="startDate"
							value={formData.startDate}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="datetime-local"
							name="expirationDate"
							value={formData.expirationDate}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="imageUrl"
							placeholder="Image URL"
							value={formData.imageUrl}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="city"
							placeholder="City"
							value={formData.city}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="country"
							placeholder="Country"
							value={formData.country}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="number"
							name="ticketsAvailable"
							placeholder="Tickets Available"
							value={formData.ticketsAvailable}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="storeId"
							placeholder="Store ID"
							value={formData.storeId}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="secretName"
							placeholder="Secret Name"
							value={formData.secretName}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="category"
							placeholder="Category"
							value={formData.category}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>
						<input
							type="text"
							name="eventType"
							placeholder="Event Type"
							value={formData.eventType}
							onChange={handleInputChange}
							className="w-full px-4 py-2 border rounded"
						/>

						<button
							type="button"
							// onClick={createCampaign}
							onClick={callContract}
							className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
						>
							Create Campaign
						</button>
					</div>
				</>
			)}
		</main>
	);
}
