import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

const COUNTER_ADDRESS = "0xA2DD26D1e1b87975692ab9efdD84177BC16fcA98";

// Create public client
const client = createPublicClient({
	chain: worldchain,
	transport: http(),
});

// Counter contract ABI (only what we need)
const counterABI = [
	{
		inputs: [],
		name: "number",
		outputs: [{ type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
] as const;

// Function to read the counter
async function readCounter() {
	try {
		const number = await client.readContract({
			address: COUNTER_ADDRESS,
			abi: counterABI,
			functionName: "number",
		});

		console.log("Current counter value:", number.toString());
		return number;
	} catch (error) {
		console.error("Error reading counter:", error);
		throw error;
	}
}

// Usage example (replace with your deployed contract address)
readCounter();
