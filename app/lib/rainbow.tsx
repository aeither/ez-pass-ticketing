"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { WagmiProvider } from "wagmi";
import { celoAlfajores, worldchain } from "wagmi/chains";

const config = getDefaultConfig({
	appName: "My RainbowKit App",
	projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
	chains: [worldchain, celoAlfajores],
	transports: {
		[worldchain.id]: http(),
		[celoAlfajores.id]: http(),
	},
	ssr: true,
});

const queryClient = new QueryClient();

type ProvidersProps = {
	children: React.ReactNode;
};

export default function RainbowProviders({ children }: ProvidersProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
