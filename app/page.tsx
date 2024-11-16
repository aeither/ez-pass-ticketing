import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Globe,
	List,
	Megaphone,
	PlusCircle,
	Send,
	Ticket,
	Wallet,
} from "lucide-react";
import Link from "next/link";
import { Header } from "./components/Header";

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

interface CampaignCardProps {
	title: string;
	date: string;
	image: string;
}

interface TicketItemProps {
	title: string;
	date: string;
	location: string;
}

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
			<Header />

			<main className="container mx-auto px-4 py-8">
				<section className="text-center mb-16">
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
						Your Gateway to Unforgettable Events
					</h1>
					<p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
						Secure, social, and seamless ticketing experiences
					</p>
					<Button size="lg" className="bg-purple-600 hover:bg-purple-700">
						Get Started
					</Button>
				</section>

				<section
					id="features"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
				>
					<Link href="/world/interact">
						<FeatureCard
							icon={<Send className="h-8 w-8 text-purple-600" />}
							title="Interact"
							description="Interact 1."
						/>
					</Link>
					<Link href="/world/interact2">
						<FeatureCard
							icon={<Send className="h-8 w-8 text-purple-600" />}
							title="Interact2"
							description="Interact 2."
						/>
					</Link>
					<Link href="/world/verify">
						<FeatureCard
							icon={<Globe className="h-8 w-8 text-purple-600" />}
							title="World ID Verification"
							description="Buy tickets securely with World ID verification, ensuring authenticity and preventing fraud."
						/>
					</Link>
					<Link href="/world/pay">
						<FeatureCard
							icon={<Send className="h-8 w-8 text-purple-600" />}
							title="Send Money to Friends"
							description="Split costs and send money to friends seamlessly within the app."
						/>
					</Link>
					<Link href="/world/campaigns">
						<FeatureCard
							icon={<Megaphone className="h-8 w-8 text-purple-600" />}
							title="Discover Campaigns"
							description="Explore exciting event campaigns and be the first to know about upcoming experiences."
						/>
					</Link>
					<FeatureCard
						icon={<Ticket className="h-8 w-8 text-purple-600" />}
						title="Buy Tickets"
						description="Purchase tickets quickly and securely for your favorite events."
					/>
					<Link href="/world/tickets">
						<FeatureCard
							icon={<Wallet className="h-8 w-8 text-purple-600" />}
							title="Manage Your Tickets"
							description="Access and manage all your tickets in one convenient place."
						/>
					</Link>
					<Link href="/world/create-campaign">
						<FeatureCard
							icon={<PlusCircle className="h-8 w-8 text-purple-600" />}
							title="Create Campaigns"
							description="Launch your own event campaigns and sell tickets directly through the app."
						/>
					</Link>
				</section>

				<section id="campaigns" className="mb-16">
					<h2 className="text-3xl font-bold mb-8 text-center">
						Featured Campaigns
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						<CampaignCard
							title="Summer Music Festival"
							date="Aug 15-17, 2024"
							image="/placeholder.svg?height=200&width=400"
						/>
						<CampaignCard
							title="Tech Conference 2024"
							date="Sep 5-7, 2024"
							image="/placeholder.svg?height=200&width=400"
						/>
						<CampaignCard
							title="Food & Wine Expo"
							date="Oct 1-3, 2024"
							image="/placeholder.svg?height=200&width=400"
						/>
					</div>
				</section>

				<section id="tickets" className="mb-16">
					<h2 className="text-3xl font-bold mb-8 text-center">Your Tickets</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-semibold">Upcoming Events</h3>
							<Button variant="outline" size="sm">
								<List className="h-4 w-4 mr-2" />
								View All
							</Button>
						</div>
						<div className="space-y-4">
							<TicketItem
								title="Comedy Night Spectacular"
								date="Jul 10, 2024"
								location="Laugh Factory, LA"
							/>
							<TicketItem
								title="Annual Charity Gala"
								date="Nov 20, 2024"
								location="Grand Ballroom, NYC"
							/>
						</div>
					</div>
				</section>
			</main>

			<footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col sm:flex-row justify-between items-center">
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
							© 2024 Safe Ticket. All rights reserved.
						</p>
						<div className="flex space-x-4">
							<Link
								href="#"
								className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Privacy Policy
							</Link>
							<Link
								href="#"
								className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Terms of Service
							</Link>
							<Link
								href="#"
								className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<CardContent className="p-6">
				<div className="mb-4">{icon}</div>
				<h3 className="text-xl font-semibold mb-2">{title}</h3>
				<p className="text-gray-600 dark:text-gray-300">{description}</p>
			</CardContent>
		</Card>
	);
}

function CampaignCard({ title, date, image }: CampaignCardProps) {
	return (
		<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<img src={image} alt={title} className="w-full h-48 object-cover" />
			<CardContent className="p-4">
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
				<p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
				<Button variant="link" className="mt-2 p-0">
					Learn More
				</Button>
			</CardContent>
		</Card>
	);
}

function TicketItem({ title, date, location }: TicketItemProps) {
	return (
		<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
			<div>
				<h4 className="font-semibold">{title}</h4>
				<p className="text-sm text-gray-600 dark:text-gray-300">
					{date} - {location}
				</p>
			</div>
			<Button variant="outline" size="sm">
				View
			</Button>
		</div>
	);
}
