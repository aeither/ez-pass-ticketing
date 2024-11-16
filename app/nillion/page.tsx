"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SecretManager() {
	const [secretValue, setSecretValue] = useState("");
	const [storeId, setStoreId] = useState("");
	const [isStoring, setIsStoring] = useState(false);
	const [isRetrieving, setIsRetrieving] = useState(false);
	const [retrievedSecret, setRetrievedSecret] = useState<string | null>(null);

	const handleStore = async () => {
		if (!secretValue) return;

		setIsStoring(true);
		try {
			const response = await fetch("/api/nillion/secrets", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ secretValue }),
			});
			const data = await response.json();
			console.log("Stored secret:", data);
			if (data.store_id) setStoreId(data.store_id);
		} catch (error) {
			console.error("Failed to store secret:", error);
		} finally {
			setIsStoring(false);
		}
	};

	const handleRetrieve = async () => {
		if (!storeId) return;

		setIsRetrieving(true);
		try {
			const response = await fetch(
				`/api/nillion/secrets?store_id=${storeId}&index=0`,
			);
			const data = await response.json();
			setRetrievedSecret(data.secret);
		} catch (error) {
			console.error("Failed to retrieve secret:", error);
		} finally {
			setIsRetrieving(false);
		}
	};

	return (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Secret Manager</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Input
						type="text"
						value={secretValue}
						onChange={(e) => setSecretValue(e.target.value)}
						placeholder="Enter secret"
						className="w-full"
					/>
					<Button
						onClick={handleStore}
						disabled={!secretValue || isStoring}
						className="w-full"
					>
						{isStoring ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Storing...
							</>
						) : (
							"Store Secret"
						)}
					</Button>
				</div>

				{storeId && (
					<div className="space-y-2">
						<Input
							type="text"
							value={storeId}
							onChange={(e) => setStoreId(e.target.value)}
							placeholder="Store ID"
							className="w-full"
						/>
						<Button
							onClick={handleRetrieve}
							disabled={!storeId || isRetrieving}
							variant="secondary"
							className="w-full"
						>
							{isRetrieving ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Retrieving...
								</>
							) : (
								"Retrieve Secret"
							)}
						</Button>
					</div>
				)}

				{retrievedSecret && (
					<div className="pt-4">
						<p className="text-sm font-medium">Retrieved Secret:</p>
						<p className="mt-1 text-sm text-muted-foreground break-all">
							{retrievedSecret}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}