"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CirclesConfig } from "@circles-sdk/sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCirclesSDK } from "../lib/providers";

// Move the config outside the component
const GnosisChainConfig: CirclesConfig = {
	circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
	v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
	v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
	migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
	nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
	profileServiceUrl:
		"https://static.94.138.251.148.clients.your-server.de/profiles/",
	baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
};

// Make CirclesWallet a regular component
function CirclesWallet() {
	const { sdk, isConnected, circlesAddress, initSdk } = useCirclesSDK();
	const [balance, setBalance] = useState<string>("0");
	const [isLoading, setIsLoading] = useState(false);

	const fetchBalance = async () => {
		if (!sdk || !circlesAddress) return;

		try {
			setIsLoading(true);
			// Balance fetching logic here
		} catch (error) {
			toast.error("Error fetching balance", {
				description: "Could not fetch your Circles balance. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleConnect = async () => {
		try {
			await initSdk();
			toast.success("Connected!", {
				description: "Successfully connected to Circles",
			});
		} catch (error) {
			toast.error("Connection failed", {
				description: "Could not connect to Circles. Please try again.",
			});
		}
	};

	if (!isConnected) {
		return (
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Connect to Circles</CardTitle>
					<CardDescription>
						Connect your wallet to view your Circles balance and transactions
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={handleConnect} className="w-full">
						Connect Wallet
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Circles Wallet</CardTitle>
				<CardDescription>
					Manage your Circles tokens and transactions
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<Alert>
					<AlertTitle>Connected Address</AlertTitle>
					<AlertDescription className="break-all">
						{circlesAddress || "No address found"}
					</AlertDescription>
				</Alert>

				<div className="space-y-2">
					<h3 className="text-sm font-medium">Current Balance</h3>
					{isLoading ? (
						<Skeleton className="h-8 w-full" />
					) : (
						<p className="text-2xl font-bold">{balance} CRC</p>
					)}
				</div>
			</CardContent>

			<CardFooter className="flex gap-2">
				<Button onClick={fetchBalance} disabled={isLoading} className="w-full">
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Refresh Balance
				</Button>
			</CardFooter>
		</Card>
	);
}

// Export the page component as default
export default function Page() {
	return (
		<div className="container mx-auto p-4 min-h-screen">
			<div className="max-w-2xl mx-auto space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold">Circles Wallet Dashboard</h1>
					<p className="text-muted-foreground">
						Manage your Circles tokens and view your balance
					</p>
				</div>

				<CirclesWallet />

				<button type="button" onClick={() => toast.success("My first toast")}>
					Give me a toast
				</button>
			</div>
		</div>
	);
}