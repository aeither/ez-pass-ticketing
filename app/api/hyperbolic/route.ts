import axios from "axios";
import type { NextRequest } from "next/server";

interface UploadResponse {
	IpfsHash?: string;
	error?: string;
}

class Hyperbolic {
	private imgB64: string | null = null;
	private ipfsUrl: string | null = null;
	private prompt: string;

	constructor(prompt: string) {
		this.prompt = prompt;
	}

	async getImgB64(): Promise<string | null> {
		if (this.imgB64) {
			return this.imgB64;
		}

		const url = "https://api.hyperbolic.xyz/v1/image/generation";
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.HYPERBOLIC_API_TOKEN}`,
		};

		const data = {
			model_name: "SDXL-turbo",
			prompt: this.prompt,
			steps: 30,
			cfg_scale: 5,
			enable_refiner: false,
			height: 128,
			width: 128,
			backend: "auto",
		};

		try {
			const response = await axios.post(url, data, { headers });
			this.imgB64 = response.data?.images?.[0]?.image || null;
			return this.imgB64;
		} catch (error) {
			console.error("Error generating image:", error);
			return null;
		}
	}

	async getIpfsUrl(): Promise<string | null> {
		if (this.ipfsUrl) {
			return this.ipfsUrl;
		}

		const imgB64 = await this.getImgB64();
		if (!imgB64) {
			throw new Error("No image base64 data available");
		}

		const imageBytes = Buffer.from(imgB64, "base64");
		const response = await this.uploadToPinata(imageBytes);

		if (response.IpfsHash) {
			this.ipfsUrl = `https://pink-faithful-lion-130.mypinata.cloud/ipfs/${response.IpfsHash}`;
		}

		return this.ipfsUrl;
	}

	private async uploadToPinata(imageBytes: Buffer): Promise<UploadResponse> {
		const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
		const headers = {
			pinata_api_key: process.env.PINATA_API_KEY || "",
			pinata_secret_api_key: process.env.PINATA_API_SECRET || "",
		};

		const formData = new FormData();
		formData.append("file", new Blob([imageBytes]), "image.png");

		try {
			const response = await axios.post(url, formData, { headers });
			return response.data;
		} catch (error) {
			console.error("Error uploading to Pinata:", error);
			return { error: `Error uploading to Pinata: ${error}` };
		}
	}
}

export async function POST(request: NextRequest) {
	try {
		const { prompt } = await request.json();

		if (!prompt) {
			return Response.json({ error: "Prompt is required" }, { status: 400 });
		}

		const hyperbolic = new Hyperbolic(prompt);

		// Get both base64 and IPFS URL
		const [imgB64, ipfsUrl] = await Promise.all([
			hyperbolic.getImgB64(),
			hyperbolic.getIpfsUrl(),
		]);

		return Response.json({
			base64Image: imgB64,
			ipfsUrl: ipfsUrl,
		});
	} catch (error) {
		console.error("API Error:", error);
		return Response.json({ error: "Failed to process image" }, { status: 500 });
	}
}

export async function GET() {
	return Response.json(
		{ message: "Use POST method with a prompt in the request body" },
		{ status: 405 },
	);
}