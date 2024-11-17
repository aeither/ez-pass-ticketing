"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MiniKit } from "@worldcoin/minikit-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
	const [isWorldApp, setIsWorldApp] = useState(false);

	useEffect(() => {
		if (MiniKit.isInstalled()) {
			setIsWorldApp(true);
			return;
		}
	}, []);

	return (
		<header className="sticky top-0 z-50 backdrop-blur-lg bg-white/75 dark:bg-gray-900/75 border-b border-gray-200 dark:border-gray-800">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-purple-600 dark:text-purple-400"
				>
					EZ Pass
				</Link>
				<nav className="hidden sm:flex space-x-4">
					<Link
						href="#features"
						className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400"
					>
						Features
					</Link>
					<Link
						href="#campaigns"
						className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400"
					>
						Campaigns
					</Link>
					<Link
						href="#tickets"
						className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400"
					>
						My Tickets
					</Link>
				</nav>
				{!isWorldApp && <ConnectButton />}
			</div>
		</header>
	);
}
