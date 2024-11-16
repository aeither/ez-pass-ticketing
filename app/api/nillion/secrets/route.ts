import crypto from "crypto";
import dotenv from "dotenv";
import type { NextRequest } from "next/server";
import { retrieveSecret, storeSecret } from "../../../lib/nillionStore";
dotenv.config();

if (!process.env.NEXT_PUBLIC_WORLD_APP_ID)
	throw new Error("NEXT_PUBLIC_WORLD_APP_ID not found");
const NEXT_PUBLIC_WORLD_APP_ID = process.env.NEXT_PUBLIC_WORLD_APP_ID;

const nillionConfig = {
	appId: NEXT_PUBLIC_WORLD_APP_ID,
	contractName: "your_contract_name",
};

const hashStr = (str: string): string => {
	return crypto.createHash("sha256").update(str).digest("hex");
};

export async function POST(request: NextRequest) {
	try {
		const { secretValue } = await request.json();
		const result = await storeSecret(nillionConfig, secretValue);

		result.secretName = hashStr(secretValue);

		return Response.json(result);
	} catch (error) {
		return Response.json({ error: "Failed to store secret" }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const storeId = searchParams.get("storeId");
		const secretName = searchParams.get("secretName");
		const index = Number.parseInt(searchParams.get("index") || "0");

		if (!storeId || !secretName) {
			return Response.json(
				{ error: "Missing required parameters" },
				{ status: 400 },
			);
		}

		const secret = await retrieveSecret(
			nillionConfig,
			storeId,
			secretName,
			index,
		);
		return Response.json({ secret });
	} catch (error) {
		return Response.json(
			{ error: "Failed to retrieve secret" },
			{ status: 500 },
		);
	}
}
