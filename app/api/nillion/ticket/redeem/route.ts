// app/api/ticket/register/route.ts
import type { NextRequest } from "next/server";

const BASE_URL = process.env.THUNDER_HORN_API_URL;
if (!BASE_URL) throw new Error("THUNDER_HORN_API_URL not found");

// app/api/ticket/redeem/route.ts
interface RedeemResponse {
	store_id: string;
	party_ids_to_store_ids: string;
	status: string;
	message?: string;
}

export async function POST(request: NextRequest) {
	try {
		const { user_id, store_id, ticket_id, wallet_id } = await request.json();

		const response = await fetch(`${BASE_URL}/redeem`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id,
				store_id,
				ticket_id,
				wallet_id,
			}),
		});

		const data: RedeemResponse = await response.json();

		if (data.status !== "success") {
			return Response.json(
				{ error: data.message || "Redemption failed" },
				{ status: 400 },
			);
		}

		return Response.json({
			store_id: data.store_id,
			party_ids_to_store_ids: data.party_ids_to_store_ids,
		});
	} catch (error) {
		return Response.json({ error: "Failed to redeem ticket" }, { status: 500 });
	}
}
