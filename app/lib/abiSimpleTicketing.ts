export const abi = [
	{
		type: "function",
		name: "buyTicket",
		inputs: [{ name: "_campaignId", type: "uint256", internalType: "uint256" }],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "campaigns",
		inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		outputs: [
			{ name: "id", type: "uint256", internalType: "uint256" },
			{ name: "owner", type: "address", internalType: "address" },
			{ name: "name", type: "string", internalType: "string" },
			{ name: "ticketPrice", type: "uint256", internalType: "uint256" },
			{
				name: "totalTickets",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "availableTickets",
				type: "uint256",
				internalType: "uint256",
			},
			{ name: "active", type: "bool", internalType: "bool" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "createCampaign",
		inputs: [
			{ name: "_name", type: "string", internalType: "string" },
			{
				name: "_ticketPrice",
				type: "uint256",
				internalType: "uint256",
			},
			{
				name: "_totalTickets",
				type: "uint256",
				internalType: "uint256",
			},
		],
		outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "getCampaign",
		inputs: [{ name: "_campaignId", type: "uint256", internalType: "uint256" }],
		outputs: [
			{
				name: "",
				type: "tuple",
				internalType: "struct SimpleTicketingSystem.Campaign",
				components: [
					{ name: "id", type: "uint256", internalType: "uint256" },
					{ name: "owner", type: "address", internalType: "address" },
					{ name: "name", type: "string", internalType: "string" },
					{
						name: "ticketPrice",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "totalTickets",
						type: "uint256",
						internalType: "uint256",
					},
					{
						name: "availableTickets",
						type: "uint256",
						internalType: "uint256",
					},
					{ name: "active", type: "bool", internalType: "bool" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getUserTickets",
		inputs: [
			{ name: "_user", type: "address", internalType: "address" },
			{ name: "_campaignId", type: "uint256", internalType: "uint256" },
		],
		outputs: [
			{
				name: "",
				type: "tuple[]",
				internalType: "struct SimpleTicketingSystem.Ticket[]",
				components: [
					{
						name: "campaignId",
						type: "uint256",
						internalType: "uint256",
					},
					{ name: "owner", type: "address", internalType: "address" },
					{ name: "isRedeemed", type: "bool", internalType: "bool" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "redeemTicket",
		inputs: [
			{ name: "_campaignId", type: "uint256", internalType: "uint256" },
			{ name: "_ticketIndex", type: "uint256", internalType: "uint256" },
		],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		name: "userTickets",
		inputs: [
			{ name: "", type: "address", internalType: "address" },
			{ name: "", type: "uint256", internalType: "uint256" },
			{ name: "", type: "uint256", internalType: "uint256" },
		],
		outputs: [
			{ name: "campaignId", type: "uint256", internalType: "uint256" },
			{ name: "owner", type: "address", internalType: "address" },
			{ name: "isRedeemed", type: "bool", internalType: "bool" },
		],
		stateMutability: "view",
	},
	{
		type: "event",
		name: "CampaignCreated",
		inputs: [
			{
				name: "campaignId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "name",
				type: "string",
				indexed: false,
				internalType: "string",
			},
			{
				name: "ticketPrice",
				type: "uint256",
				indexed: false,
				internalType: "uint256",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TicketPurchased",
		inputs: [
			{
				name: "campaignId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "buyer",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{
		type: "event",
		name: "TicketRedeemed",
		inputs: [
			{
				name: "campaignId",
				type: "uint256",
				indexed: true,
				internalType: "uint256",
			},
			{
				name: "holder",
				type: "address",
				indexed: true,
				internalType: "address",
			},
		],
		anonymous: false,
	},
	{ type: "error", name: "CampaignNotActive", inputs: [] },
	{ type: "error", name: "InsufficientPayment", inputs: [] },
	{ type: "error", name: "NoTicketsAvailable", inputs: [] },
	{ type: "error", name: "NotTicketOwner", inputs: [] },
	{ type: "error", name: "TicketAlreadyRedeemed", inputs: [] },
] as const;
