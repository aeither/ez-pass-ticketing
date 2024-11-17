// app/api/ticket/register/route.ts
import type { NextRequest } from "next/server";

const BASE_URL = process.env.THUNDER_HORN_API_URL;
if (!BASE_URL) throw new Error("THUNDER_HORN_API_URL not found");

// app/api/ticket/verify/route.ts
interface VerifyResponse {
	result: {
		status: number;
	};
	status: string;
	message?: string;
}

export async function POST(request: NextRequest) {
	try {
		const { store_id, party_ids_to_store_ids } = await request.json();

		const response = await fetch(`${BASE_URL}/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				store_id,
				party_ids_to_store_ids,
			}),
		});

		const data: VerifyResponse = await response.json();

		if (data.status !== "success") {
			return Response.json(
				{ error: data.message || "Verification failed" },
				{ status: 400 },
			);
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error: "Failed to verify ticket" }, { status: 500 });
	}
}
