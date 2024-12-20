import { Compute } from "@/components/Compute";
import { ComputeOutput } from "@/components/ComputeOutput";
import FetchValue from "@/components/FetchValue";
import InstructionsTab from "@/components/InstructionsTab";
import { StoreProgram } from "@/components/StoreProgram";
import StoreValue from "@/components/StoreValue";
import Image from "next/image";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="flex flex-row p-2 gap-2">
				<a className="border p-2 rounded-md" href="/verify">
					World Verify
				</a>
				<a className="border p-2 rounded-md" href="/pay">
					World Pay
				</a>
				<a className="border p-2 rounded-md" href="/world-interact">
					World Interact
				</a>
			</div>
			<div className="w-full flex flex-col items-center font-mono text-sm">
				<Image
					src="/logo.svg"
					alt="Next.js logo"
					style={{ width: "180px", height: "38px" }}
					width={180}
					height={38}
					priority
					className="hidden dark:block"
				/>
				<Image
					src="/dark_logo.svg"
					alt="Next.js logo"
					style={{ width: "180px", height: "38px" }}
					width={180}
					height={38}
					priority
					className="block dark:hidden"
				/>
				<InstructionsTab />
				<div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
						<StoreValue />
						<FetchValue />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
						<StoreProgram />
						<Compute />
						<ComputeOutput />
					</div>
				</div>
			</div>
		</main>
	);
}
