import { createPublicClient, http } from "viem";
import { worldchain } from "viem/chains";

// Create public client
export const readClient = createPublicClient({
	chain: worldchain,
	transport: http(),
});

