// app/upload/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UploadPage() {
	const [ipfsUrl, setIpfsUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>("");

	const uploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		if (data.ipfsUrl) {
			return data.ipfsUrl;
		}
			throw new Error(data.error);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		setError("");

		try {
			const url = await uploadFile(file);
			setIpfsUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to upload file");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="container mx-auto p-4 max-w-xl">
			<div className="space-y-6">
				<h1 className="text-2xl font-bold">Upload to IPFS</h1>

				<div className="space-y-4">
					<Input
						type="file"
						onChange={handleFileChange}
						disabled={isLoading}
						className="cursor-pointer"
					/>

					{isLoading && <p className="text-muted-foreground">Uploading...</p>}

					{error && <p className="text-red-500">{error}</p>}

					{ipfsUrl && (
						<div className="space-y-2">
							<p className="text-green-600">Upload successful!</p>
							<div className="flex items-center gap-2">
								<Input value={ipfsUrl} readOnly />
								<Button
									onClick={() => {
										navigator.clipboard.writeText(ipfsUrl);
									}}
								>
									Copy
								</Button>
							</div>
							<a
								href={ipfsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								View on IPFS
							</a>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}