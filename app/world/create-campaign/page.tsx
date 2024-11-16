// app/create-campaign/page.tsx
"use client";

import { abi as ticketingSystemABI } from "@/lib/abi";
import { TICKETING_SYSTEM_ADDRESS } from "@/lib/constants";
import { MiniKit } from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";
import { parseEther } from "viem"; // You can still use viem for parsing

const BASE_EXPLORER_URL = "https://worldscan.org";

export default function CreateCampaignPage() {
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8">
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
					onClick={createCampaign}
					className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Create Campaign
				</button>
			</div>
		</main>
	);
}
