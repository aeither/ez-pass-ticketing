"use client";

import { MiniKit } from "@worldcoin/minikit-js";
import { type ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Passing appId in the install is optional
		// but allows you to access it later via `window.MiniKit.appId`
		MiniKit.install();
		console.log(MiniKit.isInstalled());
	}, []);

	return <>{children}</>;
}
