// app/api/nillion/user/route.ts
import type { NextRequest } from "next/server";
import { getUserId } from "../../../lib/nillionStore";

export async function GET(request: NextRequest) {
	try {
		const contractName = "your_contract_name";
		const userId = await getUserId(contractName);
		return Response.json({ userId });
	} catch (error) {
		return Response.json({ error: "Failed to get user ID" }, { status: 500 });
	}
}
