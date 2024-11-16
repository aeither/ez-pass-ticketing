// app/counter/page.tsx
"use client";

import { abi as abiCounter } from "@/lib/abiCounter";
import { abi as simpleTicketingSystemABI } from "@/lib/abiSimpleTicketing";
import { SIMPLE_TICKETING_SYSTEM_ADDRESS } from "@/lib/constants";
import { MiniKit } from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";

const COUNTER_ADDRESS = "0xA2DD26D1e1b87975692ab9efdD84177BC16fcA98"; // mainnnet

export default function CounterPage() {
	const [newNumber, setNewNumber] = useState<number>(0);
	const [userDetails, setUserDetails] = useState({
		username: "",
		walletAddress: "",
	});

	useEffect(() => {
		// Update user details when component mounts
		if (MiniKit.user) {
			setUserDetails({
				username: MiniKit.user.username || "Not connected",
				walletAddress: MiniKit.user.walletAddress || "Not connected",
			});
		}
	}, []);

	const doSomething = async () => {
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
							abi: abiCounter,
							functionName: "increment",
							args: [],
						},
					],
				});
			console.log("Transaction sent:", finalPayload);
		} catch (error) {
			console.error("Error:", error);
			alert("Transaction failed");
		}
	};
	const increment = async () => {
		if (!MiniKit.isInstalled()) {
			alert("Please install MiniKit");
			return;
		}

		try {
			const { commandPayload, finalPayload } =
				await MiniKit.commandsAsync.sendTransaction({
					transaction: [
						{
							address: SIMPLE_TICKETING_SYSTEM_ADDRESS,
							abi: simpleTicketingSystemABI,
							functionName: "createCampaign",
							args: ["hello", BigInt(1), BigInt(1)],
						},
					],
				});
			console.log("Transaction sent:", finalPayload);
		} catch (error) {
			console.error("Error:", error);
			alert("Transaction failed");
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
			<h1 className="text-4xl font-bold mb-8">Counter Contract Interface</h1>

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

			<button
				type="button"
				onClick={doSomething}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			>
				doSomething
			</button>
			<button
				type="button"
				onClick={increment}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
			>
				Increment Counter
			</button>

			<div className="flex gap-2">
				<input
					type="number"
					value={newNumber}
					onChange={(e) => setNewNumber(Number(e.target.value))}
					className="px-4 py-2 border rounded"
					placeholder="Enter new number"
				/>
			</div>
		</main>
	);
}
