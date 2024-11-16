import axios from 'axios';

/**
 * Add the following to your env
 * HYPERBOLIC_API_TOKEN=your_hyperbolic_api_token
 * PINATA_API_KEY=your_pinata_api_key
 * PINATA_API_SECRET=your_pinata_api_secret
 *
 *
 *
 * Example usage:
 *
 * async function main() {
 *     const prompt = "A futuristic cityscape with flying cars";
 *     const hyperbolic = new Hyperbolic(prompt);
 *
 *     try {
 *         // Generate Base64 Image
 *         const imgB64 = await hyperbolic.getImgB64();
 *         console.log("Base64 Image:", imgB64);
 *
 *         // Upload to IPFS and get the URL
 *         const ipfsUrl = await hyperbolic.getIpfsUrl();
 *         console.log("IPFS URL:", ipfsUrl);
 *     } catch (error) {
 *         console.error("Error using Hyperbolic:", error);
 *     }
 * }
 *
 *
 *
 */




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
        console.log('getting image');

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
            console.error('Error generating image:', error);
            return null;
        }
    }

    async getIpfsUrl(): Promise<string | null> {
        console.log('getting ipfs url');

        if (this.ipfsUrl) {
            return this.ipfsUrl;
        }

        const imgB64 = await this.getImgB64();
        if (!imgB64) {
            console.error('No image base64 data available');
            return null;
        }

        const imageBytes = Buffer.from(imgB64, 'base64');
        const response = await this.uploadToPinata(imageBytes);

        if (response.IpfsHash) {
            this.ipfsUrl = `https://pink-faithful-lion-130.mypinata.cloud/ipfs/${response.IpfsHash}`;
        }

        return this.ipfsUrl;
    }

    async uploadToPinata(imageBytes: Buffer): Promise<UploadResponse> {
        console.log('uploading image');

        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

        const headers = {
            pinata_api_key: process.env.PINATA_API_KEY || '',
            pinata_secret_api_key: process.env.PINATA_API_SECRET || '',
        };

        const formData = new FormData();
        formData.append('file', new Blob([imageBytes]), 'image.png');

        try {
            const response = await axios.post(url, formData, { headers });
            return response.data;
        } catch (error) {
            console.error('Error uploading to Pinata:', error);
            return { error: `Error uploading to Pinata: ${error}` };
        }
    }
}

export default Hyperbolic;
