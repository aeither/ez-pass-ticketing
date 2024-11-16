"use client";

import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";
import { Sdk } from "@circles-sdk/sdk";
import { JsonRpcProvider } from "ethers";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

// Define types
type CirclesSDKContextType = {
	sdk: Sdk | null;
	isConnected: boolean;
	setIsConnected: (connected: boolean) => void;
	adapter: BrowserProviderContractRunner | null;
	circlesProvider: JsonRpcProvider | null;
	circlesAddress: string | null;
	initSdk: () => Promise<void>;
};

// Chain configuration type
type ChainConfig = {
	circlesRpcUrl: string;
	pathfinderUrl: string;
	v1HubAddress: string;
	v2HubAddress: string;
	nameRegistryAddress: string;
	migrationAddress: string;
	profileServiceUrl: string;
};

// Create context with type
export const CirclesSDKContext = createContext<CirclesSDKContextType>({
	sdk: null,
	isConnected: false,
	setIsConnected: () => {},
	adapter: null,
	circlesProvider: null,
	circlesAddress: null,
	initSdk: async () => {},
});

// Configuration for Gnosis Chain
const GNOSIS_CHAIN_CONFIG: ChainConfig = {
	circlesRpcUrl: "https://rpc.aboutcircles.com/",
	pathfinderUrl: "https://pathfinder.aboutcircles.com",
	v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
	v2HubAddress: "0xc12C1E50ABB450d6205Ea2C3Fa861b3B834d13e8",
	nameRegistryAddress: "0xA27566fD89162cC3D40Cb59c87AAaA49B85F3474",
	migrationAddress: "0xD44B8dcFBaDfC78EA64c55B705BFc68199B56376",
	profileServiceUrl: "https://rpc.aboutcircles.com/profiles/",
};

interface CirclesSDKProviderProps {
	children: ReactNode;
}

export function CirclesSDKProvider({ children }: CirclesSDKProviderProps) {
	const [sdk, setSdk] = useState<Sdk | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [adapter, setAdapter] = useState<BrowserProviderContractRunner | null>(
		null,
	);
	const [circlesProvider, setCirclesProvider] =
		useState<JsonRpcProvider | null>(null);
	const [circlesAddress, setCirclesAddress] = useState<string | null>(null);

	const initSdk = useCallback(async () => {
		try {
			// Initialize adapter
			const adapter = new BrowserProviderContractRunner();
			await adapter.init();
			setAdapter(adapter);

			// Set up provider
			const provider = new JsonRpcProvider(GNOSIS_CHAIN_CONFIG.circlesRpcUrl);
			setCirclesProvider(provider);

			// Get user address
			const address = await adapter.address;
			setCirclesAddress(address ?? null);

			// Initialize SDK
			const sdkInstance = new Sdk(adapter, GNOSIS_CHAIN_CONFIG);
			setSdk(sdkInstance);
			setIsConnected(true);

			// console.log("SDK initialized successfully:", {
			// 	address,
			// 	provider: provider.connection,
			// 	sdkInstance,
			// });
		} catch (error) {
			console.error("Failed to initialize Circles SDK:", error);
			setIsConnected(false);
		}
	}, []);

	// Auto-initialize SDK on mount
	useEffect(() => {
		initSdk();
	}, [initSdk]);

	const value = {
		sdk,
		isConnected,
		setIsConnected,
		adapter,
		circlesProvider,
		circlesAddress,
		initSdk,
	};

	return (
		<CirclesSDKContext.Provider value={value}>
			{children}
		</CirclesSDKContext.Provider>
	);
}

// Custom hook for using the Circles SDK context
export function useCirclesSDK() {
	const context = useContext(CirclesSDKContext);
	if (!context) {
		throw new Error("useCirclesSDK must be used within a CirclesSDKProvider");
	}
	return context;
}