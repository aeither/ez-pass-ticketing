export const abi =  [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "DEFAULT_ADMIN_ROLE",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "UPDATER_ROLE",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "buyTicket",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "imageUrl",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nillionStoreId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nillionUserId",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "campaignCount",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "campaigns",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "description",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "pricePerTicket",
          "type": "uint96",
          "internalType": "uint96"
        },
        {
          "name": "platformFeePercentage",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "transferFeePercentage",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "startDate",
          "type": "uint40",
          "internalType": "uint40"
        },
        {
          "name": "expirationDate",
          "type": "uint40",
          "internalType": "uint40"
        },
        {
          "name": "imageUrl",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "city",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "country",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "ticketsAvailable",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "ticketsSold",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "exists",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "storeId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "secretName",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "category",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "eventType",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "cancelTransfer",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "completeTransfer",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "createCampaign",
      "inputs": [
        {
          "name": "_name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_description",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_pricePerTicket",
          "type": "uint96",
          "internalType": "uint96"
        },
        {
          "name": "_platformFeePercentage",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "_transferFeePercentage",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "_startDate",
          "type": "uint40",
          "internalType": "uint40"
        },
        {
          "name": "_expirationDate",
          "type": "uint40",
          "internalType": "uint40"
        },
        {
          "name": "_imageUrl",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_city",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_country",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_ticketsAvailable",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "_storeId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_secretName",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_category",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_eventType",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createTestCampaign",
      "inputs": [
        {
          "name": "name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "price",
          "type": "uint96",
          "internalType": "uint96"
        },
        {
          "name": "tickets",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createTransfer",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getApproved",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaignById",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TicketingSystem.Campaign",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "pricePerTicket",
              "type": "uint96",
              "internalType": "uint96"
            },
            {
              "name": "platformFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "transferFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "startDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "expirationDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "city",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "country",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketsAvailable",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "ticketsSold",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "exists",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "storeId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "secretName",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "category",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "eventType",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaignTickets",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.Ticket[]",
          "components": [
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "purchaseDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketIndex",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "secret",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionUserId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionStoreId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionPidToSid",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaignsByCity",
      "inputs": [
        {
          "name": "_city",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "page",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "pageSize",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.Campaign[]",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "pricePerTicket",
              "type": "uint96",
              "internalType": "uint96"
            },
            {
              "name": "platformFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "transferFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "startDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "expirationDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "city",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "country",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketsAvailable",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "ticketsSold",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "exists",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "storeId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "secretName",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "category",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "eventType",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaignsByCountry",
      "inputs": [
        {
          "name": "_country",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "page",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "pageSize",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.Campaign[]",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "pricePerTicket",
              "type": "uint96",
              "internalType": "uint96"
            },
            {
              "name": "platformFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "transferFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "startDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "expirationDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "city",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "country",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketsAvailable",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "ticketsSold",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "exists",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "storeId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "secretName",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "category",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "eventType",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCampaignsByPage",
      "inputs": [
        {
          "name": "page",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "pageSize",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.Campaign[]",
          "components": [
            {
              "name": "name",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "description",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "pricePerTicket",
              "type": "uint96",
              "internalType": "uint96"
            },
            {
              "name": "platformFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "transferFeePercentage",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "startDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "expirationDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "city",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "country",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketsAvailable",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "ticketsSold",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "exists",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "storeId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "secretName",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "category",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "eventType",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getPendingTransfersByCampaign",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.TransferListing[]",
          "components": [
            {
              "name": "transferId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "from",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "isCompleted",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "createDate",
              "type": "uint40",
              "internalType": "uint40"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getRoleAdmin",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTicket",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TicketingSystem.Ticket",
          "components": [
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "purchaseDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketIndex",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "secret",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionUserId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionStoreId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionPidToSid",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTicketSecret",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTransfer",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct TicketingSystem.TransferListing",
          "components": [
            {
              "name": "transferId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "tokenId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "from",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "isCompleted",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "createDate",
              "type": "uint40",
              "internalType": "uint40"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getUserTickets",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple[]",
          "internalType": "struct TicketingSystem.Ticket[]",
          "components": [
            {
              "name": "campaignId",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "purchaseDate",
              "type": "uint40",
              "internalType": "uint40"
            },
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "ticketIndex",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "secret",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionUserId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionStoreId",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "nillionPidToSid",
              "type": "string",
              "internalType": "string"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "grantRole",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "hasRole",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isApprovedForAll",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ownerOf",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "pause",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "paused",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "platformOwner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "redeemTicket",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "pidToSid",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeUpdater",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "renounceRole",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "callerConfirmation",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "revokeRole",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "safeTransferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setApprovalForAll",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setTicketSecret",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "ticketIndex",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "secret",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setUpdater",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tickets",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "purchaseDate",
          "type": "uint40",
          "internalType": "uint40"
        },
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "ticketIndex",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "secret",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "imageUrl",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nillionUserId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nillionStoreId",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "nillionPidToSid",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenIdCounter",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "tokenURI",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferCount",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transfers",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "campaignId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "isCompleted",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "createDate",
          "type": "uint40",
          "internalType": "uint40"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unpause",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ApprovalForAll",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "operator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "approved",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CampaignCreated",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "name",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "pricePerTicket",
          "type": "uint96",
          "indexed": false,
          "internalType": "uint96"
        },
        {
          "name": "startDate",
          "type": "uint40",
          "indexed": false,
          "internalType": "uint40"
        },
        {
          "name": "expirationDate",
          "type": "uint40",
          "indexed": false,
          "internalType": "uint40"
        },
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "category",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Paused",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RoleAdminChanged",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "previousAdminRole",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "newAdminRole",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RoleGranted",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RoleRevoked",
      "inputs": [
        {
          "name": "role",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SecretSet",
      "inputs": [
        {
          "name": "campaignId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "ticketIndex",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TicketBought",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "campaignId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "buyer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TicketTransferred",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferCancelled",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferCompleted",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TransferCreated",
      "inputs": [
        {
          "name": "transferId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Unpaused",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AccessControlBadConfirmation",
      "inputs": []
    },
    {
      "type": "error",
      "name": "AccessControlUnauthorizedAccount",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "neededRole",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ]
    },
    {
      "type": "error",
      "name": "CampaignExpired",
      "inputs": []
    },
    {
      "type": "error",
      "name": "CampaignNotFound",
      "inputs": []
    },
    {
      "type": "error",
      "name": "CampaignNotStarted",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ERC721IncorrectOwner",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InsufficientApproval",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidApprover",
      "inputs": [
        {
          "name": "approver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOperator",
      "inputs": [
        {
          "name": "operator",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidReceiver",
      "inputs": [
        {
          "name": "receiver",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721InvalidSender",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "ERC721NonexistentToken",
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "EnforcedPause",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ExpectedPause",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InsufficientTickets",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidAmount",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidDates",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidFees",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidTransferState",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ReentrancyGuardReentrantCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SecretNotFound",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TransferAlreadyCompleted",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TransferFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TransferNotFound",
      "inputs": []
    },
    {
      "type": "error",
      "name": "Unauthorized",
      "inputs": []
    }
  ] as const;