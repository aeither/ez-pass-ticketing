"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	MiniKit,
	type PayCommandInput,
	Tokens,
	tokenToDecimals,
} from "@worldcoin/minikit-js";
import { useState } from "react";
import { toast } from "sonner";

export default function PaymentPage() {
	const [isLoading, setIsLoading] = useState(false);

	const sendPayment = async () => {
		try {
			setIsLoading(true);

			// Check if MiniKit is installed
			if (!MiniKit.isInstalled()) {
				toast.error("Please install World App to make payments");
				return;
			}

			const res = await fetch("/api/initiate-payment", {
				method: "POST",
			});
			const { id } = await res.json();

			const payload: PayCommandInput = {
				reference: id,
				to: "0xB09610C0bE56604A0eE39d9Ef8d5cB053612Cc93", // Test address
				tokens: [
					{
						symbol: Tokens.WLD,
						token_amount: tokenToDecimals(0.0001, Tokens.WLD).toString(),
					},
					{
						symbol: Tokens.USDCE,
						token_amount: tokenToDecimals(0.01, Tokens.USDCE).toString(),
					},
				],
				description: "Test example payment for minikit",
			};

			const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

			if (finalPayload.status === "success") {
				const confirmRes = await fetch("/api/confirm-payment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(finalPayload),
				});
				const payment = await confirmRes.json();

				if (payment.success) {
					toast.success("Your payment has been processed successfully!");
				}
			}
		} catch (error) {
			console.error("Payment error:", error);
			// toast.error("There was an error processing your payment");
			toast.error(JSON.stringify(error));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto max-w-2xl py-8">
			<Card className="p-6">
				<div className="space-y-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold">WorldCoin Payment</h1>
						<p className="text-muted-foreground mt-2">
							Send 1 WLD and 3 USDC using World App
						</p>
					</div>

					<div className="space-y-4">
						<div className="flex justify-between p-3 bg-muted rounded-lg">
							<span>WLD Amount</span>
							<span className="font-medium">1 WLD</span>
						</div>
						<div className="flex justify-between p-3 bg-muted rounded-lg">
							<span>USDC Amount</span>
							<span className="font-medium">3 USDC</span>
						</div>
					</div>

					<Button className="w-full" onClick={sendPayment} disabled={isLoading}>
						{isLoading ? "Processing..." : "Pay with World App"}
					</Button>

					<p className="text-sm text-center text-muted-foreground">
						Make sure you have World App installed and sufficient balance
					</p>
				</div>
			</Card>
		</div>
	);
}
