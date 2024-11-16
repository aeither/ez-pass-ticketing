// components/generate-image.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
	prompt: string;
}

interface GenerationResponse {
	base64Image: string;
	ipfsUrl: string;
}

export default function GenerateImage() {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<GenerationResponse | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			prompt: "",
		},
	});

	const onSubmit = async (data: FormData) => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/hyperbolic", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: data.prompt,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to generate image");
			}

			const result = await response.json();
			setResult(result);
			toast.success("Image generated successfully!");
		} catch (error) {
			toast.error("Failed to generate image");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-2">
					<Input
						placeholder="Enter your prompt..."
						{...register("prompt", { required: "Prompt is required" })}
						disabled={isLoading}
					/>
					{errors.prompt && (
						<p className="text-sm text-red-500">{errors.prompt.message}</p>
					)}
				</div>

				<Button type="submit" disabled={isLoading} className="w-full">
					{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Generate Image
				</Button>
			</form>

			{result && (
				<div className="space-y-4">
					<Card className="p-4">
						<div className="aspect-square relative">
							<img
								src={`data:image/png;base64,${result.base64Image}`}
								// biome-ignore lint/a11y/noRedundantAlt: <explanation>
								alt="Generated image"
								className="rounded-lg object-cover"
							/>
						</div>
					</Card>

					<div className="space-y-2">
						<p className="text-sm font-medium">IPFS URL:</p>
						<a
							href={result.ipfsUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-500 hover:underline break-all"
						>
							{result.ipfsUrl}
						</a>
					</div>
				</div>
			)}
		</div>
	);
}