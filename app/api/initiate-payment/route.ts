import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	// const uuid = crypto.randomUUID().replace(/-/g, "");
	const uuid = "mockUUID";
	// TODO: Store the ID field in your database so you can verify the payment later

	return NextResponse.json({ id: uuid });
}
