"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	MiniKit,
	VerificationLevel,
	type VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { useState } from "react";
import { toast } from "sonner";

export default function WorldIDVerification() {
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

	return (
		<div className="container mx-auto max-w-2xl py-8">
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
		</div>
	);
}
