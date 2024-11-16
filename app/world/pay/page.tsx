"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	MiniKit,
	type PayCommandInput,
	Tokens,
	tokenToDecimals,
} from "@worldcoin/minikit-js";
import { AlertCircle, CreditCard, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { isAddress } from "viem";

export default function PaymentPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [recipientAddress, setRecipientAddress] = useState(
		"0xD04D21acfd53AacedF705f92C31161b276cdA123",
	);
	const [wldAmount, setWldAmount] = useState("0.0001");
	const [usdcAmount, setUsdcAmount] = useState("0.001");

	const validateInputs = () => {
		if (!isAddress(recipientAddress)) {
			toast.error("Please enter a valid recipient address");
			return false;
		}

		if (isNaN(Number(wldAmount)) || Number(wldAmount) <= 0) {
			toast.error("Please enter a valid WLD amount");
			return false;
		}

		if (isNaN(Number(usdcAmount)) || Number(usdcAmount) <= 0) {
			toast.error("Please enter a valid USDC amount");
			return false;
		}

		return true;
	};

	const sendPayment = async () => {
		if (!validateInputs()) return;

		try {
			setIsLoading(true);

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
				to: recipientAddress,
				tokens: [
					{
						symbol: Tokens.WLD,
						token_amount: tokenToDecimals(
							Number(wldAmount),
							Tokens.WLD,
						).toString(),
					},
					{
						symbol: Tokens.USDCE,
						token_amount: tokenToDecimals(
							Number(usdcAmount),
							Tokens.USDCE,
						).toString(),
					},
				],
				description: `Payment of ${wldAmount} WLD and ${usdcAmount} USDC`,
			};

			const { finalPayload } = await MiniKit.commandsAsync.pay(payload);
			console.log("🚀 ~ sendPayment ~ finalPayload:", finalPayload)

			if (finalPayload.status === "success") {
				const confirmRes = await fetch("/api/confirm-payment", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(finalPayload),
				});
				const payment = await confirmRes.json();
				console.log("🚀 ~ sendPayment ~ payment:", payment)

				if (payment.success) {
					toast.success("Your payment has been processed successfully!");
				}
			}
		} catch (error) {
			console.error("Payment error:", error);
			toast.error("Payment failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<section className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
						World ID Payment
					</h1>
					<p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
						Secure and seamless payments with World App
					</p>
				</section>

				<div className="max-w-2xl mx-auto">
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardContent className="p-8 space-y-8">
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="recipient">Recipient Address</Label>
									<Input
										id="recipient"
										placeholder="0x..."
										value={recipientAddress}
										onChange={(e) => setRecipientAddress(e.target.value)}
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<PaymentInfoCard
										icon={<Wallet className="h-8 w-8 text-purple-600" />}
										title="WLD Payment"
										amount={wldAmount}
										onAmountChange={(value) => setWldAmount(value)}
									/>
									<PaymentInfoCard
										icon={<CreditCard className="h-8 w-8 text-purple-600" />}
										title="USDC Payment"
										amount={usdcAmount}
										onAmountChange={(value) => setUsdcAmount(value)}
									/>
								</div>
							</div>

							<Button
								size="lg"
								className="w-full bg-purple-600 hover:bg-purple-700"
								onClick={sendPayment}
								disabled={isLoading}
							>
								{isLoading ? "Processing..." : "Pay with World App"}
							</Button>

							<div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
								<AlertCircle className="h-4 w-4" />
								<p>
									Make sure you have World App installed and sufficient balance
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}

interface PaymentInfoCardProps {
	icon: React.ReactNode;
	title: string;
	amount: string;
	onAmountChange: (value: string) => void;
}

function PaymentInfoCard({
	icon,
	title,
	amount,
	onAmountChange,
}: PaymentInfoCardProps) {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="space-y-4">
					<div className="flex items-center space-x-4">
						<div>{icon}</div>
						<h3 className="text-xl font-semibold">{title}</h3>
					</div>
					<div className="space-y-2">
						<Label>Amount</Label>
						<Input
							type="number"
							value={amount}
							onChange={(e) => onAmountChange(e.target.value)}
							min="0"
							step="0.0001"
							className="text-right"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
