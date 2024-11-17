// app/api/ticket/register/route.ts
import type { NextRequest } from "next/server";

const BASE_URL = process.env.THUNDER_HORN_API_URL;
if (!BASE_URL) throw new Error("THUNDER_HORN_API_URL not found");

interface RegistrationResponse {
	user_id: string;
	store_id: string;
	status: string;
	message?: string;
}

export async function POST(request: NextRequest) {
	try {
		const { ticket_id, ticket_owner } = await request.json();

		const response = await fetch(`${BASE_URL}/initial`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ticket_id,
				ticket_owner,
				is_redeemed: 0,
			}),
		});

		const data: RegistrationResponse = await response.json();

		if (data.status !== "success") {
			return Response.json(
				{ error: data.message || "Registration failed" },
				{ status: 400 },
			);
		}

		return Response.json({
			user_id: data.user_id,
			store_id: data.store_id,
		});
	} catch (error) {
		return Response.json(
			{ error: "Failed to register ticket" },
			{ status: 500 },
		);
	}
}
