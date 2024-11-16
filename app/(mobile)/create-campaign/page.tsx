"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Camera, DollarSign, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EnhancedCreateCampaign() {
	const [step, setStep] = useState(1);
	const totalSteps = 5;

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		pricePerTicket: 0.05,
		platformFeePercentage: 5,
		transferFeePercentage: 10,
		transferCooldown: 24,
		imageUrl: "https://example.com/image.jpg",
		city: "",
		country: "",
		ticketsAvailable: 100,
		category: "",
		eventType: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string) => (value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSliderChange = (name: string) => (value: number[]) => {
		setFormData((prev) => ({ ...prev, [name]: value[0] }));
	};

	const handleCreateCampaign = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Simulating the createCampaign function
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log("Campaign created:", {
				...formData,
				startTime: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
				endTime: Math.floor(Date.now() / 1000) + 864000, // 10 days from now
			});
			toast.success("Campaign created successfully!");
		} catch (error: any) {
			console.error("Error creating campaign:", error);
			toast.error(error.message || "Failed to create campaign");
		}
	};

	const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
	const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

	return (
		<div className="container mx-auto px-4 py-8 max-w-md">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Create New Campaign
			</h1>
			<Progress value={(step / totalSteps) * 100} className="mb-6" />
			<form onSubmit={handleCreateCampaign} className="space-y-6">
				{step === 1 && (
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Campaign Name</Label>
								<Input
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									required
									placeholder="Enter campaign name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									required
									placeholder="Describe your campaign"
									className="min-h-[100px]"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="imageUrl">Image URL</Label>
								<div className="relative">
									<Input
										id="imageUrl"
										name="imageUrl"
										type="url"
										value={formData.imageUrl}
										onChange={handleInputChange}
										required
										placeholder="https://example.com/image.jpg"
										className="pl-10"
									/>
									<Camera
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{step === 2 && (
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Pricing</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="pricePerTicket">Price Per Ticket</Label>
								<div className="relative">
									<Input
										id="pricePerTicket"
										name="pricePerTicket"
										type="number"
										step="0.01"
										value={formData.pricePerTicket}
										onChange={handleInputChange}
										required
										className="pl-10"
									/>
									<DollarSign
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="platformFeePercentage">
									Platform Fee Percentage
								</Label>
								<Slider
									id="platformFeePercentage"
									min={0}
									max={20}
									step={1}
									value={[formData.platformFeePercentage]}
									onValueChange={handleSliderChange("platformFeePercentage")}
								/>
								<p className="text-sm text-gray-500 text-right">
									{formData.platformFeePercentage}%
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="transferFeePercentage">
									Transfer Fee Percentage
								</Label>
								<Slider
									id="transferFeePercentage"
									min={0}
									max={20}
									step={1}
									value={[formData.transferFeePercentage]}
									onValueChange={handleSliderChange("transferFeePercentage")}
								/>
								<p className="text-sm text-gray-500 text-right">
									{formData.transferFeePercentage}%
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				{step === 3 && (
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Location & Availability</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<div className="relative">
									<Input
										id="city"
										name="city"
										value={formData.city}
										onChange={handleInputChange}
										required
										placeholder="Enter city"
										className="pl-10"
									/>
									<MapPin
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<div className="relative">
									<Input
										id="country"
										name="country"
										value={formData.country}
										onChange={handleInputChange}
										required
										placeholder="Enter country"
										className="pl-10"
									/>
									<MapPin
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="ticketsAvailable">Tickets Available</Label>
								<div className="relative">
									<Input
										id="ticketsAvailable"
										name="ticketsAvailable"
										type="number"
										value={formData.ticketsAvailable}
										onChange={handleInputChange}
										required
										className="pl-10"
									/>
									<Ticket
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{step === 4 && (
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Event Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Select
									name="category"
									onValueChange={handleSelectChange("category")}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="music">Music</SelectItem>
										<SelectItem value="sports">Sports</SelectItem>
										<SelectItem value="arts">Arts</SelectItem>
										<SelectItem value="food">Food</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="eventType">Event Type</Label>
								<Select
									name="eventType"
									onValueChange={handleSelectChange("eventType")}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select an event type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="concert">Concert</SelectItem>
										<SelectItem value="festival">Festival</SelectItem>
										<SelectItem value="conference">Conference</SelectItem>
										<SelectItem value="exhibition">Exhibition</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="transferCooldown">
									Transfer Cooldown (hours)
								</Label>
								<div className="relative">
									<Input
										id="transferCooldown"
										name="transferCooldown"
										type="number"
										value={formData.transferCooldown}
										onChange={handleInputChange}
										required
										className="pl-10"
									/>
									<Calendar
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{step === 5 && (
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Review & Submit</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-gray-600">
								Please review your campaign details before submitting:
							</p>
							<div className="space-y-2 text-sm">
								<p>
									<strong>Name:</strong> {formData.name}
								</p>
								<p>
									<strong>Description:</strong> {formData.description}
								</p>
								<p>
									<strong>Price Per Ticket:</strong> ${formData.pricePerTicket}
								</p>
								<p>
									<strong>Platform Fee:</strong>{" "}
									{formData.platformFeePercentage}%
								</p>
								<p>
									<strong>Transfer Fee:</strong>{" "}
									{formData.transferFeePercentage}%
								</p>
								<p>
									<strong>Location:</strong> {formData.city}, {formData.country}
								</p>
								<p>
									<strong>Tickets Available:</strong>{" "}
									{formData.ticketsAvailable}
								</p>
								<p>
									<strong>Category:</strong> {formData.category}
								</p>
								<p>
									<strong>Event Type:</strong> {formData.eventType}
								</p>
								<p>
									<strong>Transfer Cooldown:</strong>{" "}
									{formData.transferCooldown} hours
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				<div className="flex justify-between mt-6">
					{step > 1 && (
						<Button type="button" onClick={prevStep} variant="outline">
							Previous
						</Button>
					)}
					{step < totalSteps && (
						<Button type="button" onClick={nextStep} className="ml-auto">
							Next
						</Button>
					)}
					{step === totalSteps && (
						<Button type="submit" className="ml-auto">
							Create Campaign
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}
