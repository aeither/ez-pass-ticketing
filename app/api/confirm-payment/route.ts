import type { MiniAppPaymentSuccessPayload } from "@worldcoin/minikit-js";
import { type NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
	payload: MiniAppPaymentSuccessPayload;
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { payload } = body as IRequestPayload;

		if (!payload) {
			return NextResponse.json(
				{ success: false, error: "Missing payload" },
				{ status: 400 },
			);
		}

		// IMPORTANT: Here we should fetch the reference you created in /initiate-payment
		const reference = "mockUUID";

		if (payload.reference === reference) {
			const response = await fetch(
				`https://developer.worldcoin.org/api/v2/minikit/transaction/${payload.transaction_id}?app_id=${process.env.APP_ID}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${process.env.DEV_PORTAL_API_KEY}`,
					},
				},
			);

			const transaction = await response.json();

			if (
				transaction.reference === reference &&
				transaction.status !== "failed"
			) {
				return NextResponse.json({ success: true });
			}
		}

		return NextResponse.json(
			{ success: false, error: "Invalid transaction" },
			{ status: 400 },
		);
	} catch (error) {
		console.error("Error processing payment:", error);
		return NextResponse.json(
			{ success: false, error: "Server error" },
			{ status: 500 },
		);
	}
}