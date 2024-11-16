import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ClientWrapper } from "./components/ClientWrapper";
import "./globals.css";
import MiniKitProvider from "./lib/minikit-provider";
import { CirclesSDKProvider } from "./lib/providers";
import RainbowProviders from "./lib/rainbow";

export const metadata: Metadata = {
	title: "Create Nillion App",
	description: "Quickstart a Nillion fullstack app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const ErudaProvider = dynamic(
		() => import("./components/Eruda").then((c) => c.ErudaProvider),
		{
			ssr: false,
		},
	);

	return (
		<html lang="en">
			<body>
				<MiniKitProvider>
					<RainbowProviders>
						<CirclesSDKProvider>
							<ErudaProvider>
								<ClientWrapper>
									<main>{children}</main>
									<Toaster position="top-center" />
								</ClientWrapper>
							</ErudaProvider>
						</CirclesSDKProvider>
					</RainbowProviders>
				</MiniKitProvider>
			</body>
		</html>
	);
}
