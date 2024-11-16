// app/api/upload/route.ts
import type { NextRequest } from "next/server";
import PinataUploader from "./hyperbolic-with-image-upload"; // Assuming you move the class to lib folder

export async function POST(request: NextRequest) {
	try {
		// Get the image data from request
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			return Response.json({ error: "No file provided" }, { status: 400 });
		}

		// Convert file to buffer
		const bytes = await (file as File).arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Initialize uploader and upload
		const pinataUploader = new PinataUploader();
		const response = await pinataUploader.uploadToPinata(buffer);

		if (response.IpfsHash) {
			return Response.json({
				ipfsUrl: `https://pink-faithful-lion-130.mypinata.cloud/ipfs/${response.IpfsHash}`,
				ipfsHash: response.IpfsHash,
			});
		}
		return Response.json({ error: response.error }, { status: 500 });
	} catch (error) {
		console.error("Upload route error:", error);
		return Response.json({ error: "Failed to upload file" }, { status: 500 });
	}
}

// Optional: Add GET method to check upload status or service health
export async function GET() {
	return Response.json(
		{ status: "Upload service is running" },
		{ status: 200 },
	);
}
