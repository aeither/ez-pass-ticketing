// // Types
// interface RegistrationResponse {
//   user_id: string;
//   store_id: string;
//   status: string;
//   message?: string;
// }

// interface RedeemResponse {
//   store_id: string;
//   party_ids_to_store_ids: string;
//   status: string;
//   message?: string;
// }

// interface VerifyResponse {
//   result: {
//     status: number;
//   };
//   status: string;
//   message?: string;
// }

// // API Configuration
// const BASE_URL = "https://thunderhorn.ngrok.app/api";

// export class TicketAPI {
//   private static async handleResponse<T>(response: Response): Promise<T> {
//     const data = await response.json();
//     if (data.status !== 'success') {
//       throw new Error(data.message || 'API request failed');
//     }
//     return data;
//   }

//   static async registerTicket(ticketId: number, walletId: number): Promise<{
//     user_id: string;
//     store_id: string;
//   }> {
//     try {
//       console.log("\n1. Initial Setup...");
//       const response = await fetch(`${BASE_URL}/initial`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ticket_id: ticketId,
//           ticket_owner: walletId,
//           is_redeemed: 0
//         })
//       });

//       const data = await this.handleResponse<RegistrationResponse>(response);
//       console.log("Initial Response:", JSON.stringify(data, null, 2));

//       return {
//         user_id: data.user_id,
//         store_id: data.store_id
//       };

//     } catch (error) {
//       console.error("\n❌ Registration failed:", error);
//       throw error;
//     }
//   }

//   static async redeemTicket(
//     userId: string,
//     storeId: string,
//     ticketId: number,
//     walletId: number
//   ): Promise<{
//     store_id: string;
//     party_ids_to_store_ids: string;
//   }> {
//     try {
//       console.log("\n2. Redeem Ticket...");
//       const response = await fetch(`${BASE_URL}/redeem`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           store_id: storeId,
//           ticket_id: ticketId,
//           wallet_id: walletId
//         })
//       });

//       const data = await this.handleResponse<RedeemResponse>(response);
//       console.log("Redeem Response:", JSON.stringify(data, null, 2));

//       return {
//         store_id: data.store_id,
//         party_ids_to_store_ids: data.party_ids_to_store_ids
//       };

//     } catch (error) {
//       console.error("\n❌ Redemption failed:", error);
//       throw error;
//     }
//   }

//   static async verifyTicket(
//     storeId: string,
//     partyIdsToStoreIds: string
//   ): Promise<VerifyResponse> {
//     try {
//       console.log("\n3. Verify Ticket...");
//       const response = await fetch(`${BASE_URL}/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           store_id: storeId,
//           party_ids_to_store_ids: partyIdsToStoreIds
//         })
//       });

//       const data = await this.handleResponse<VerifyResponse>(response);
//       console.log("Verify Response:", JSON.stringify(data, null, 2));

//       return data;

//     } catch (error) {
//       console.error("\n❌ Verification failed:", error);
//       throw error;
//     }
//   }
// }

// // Example usage:
// // async function runTest() {
// //   try {
// //     const ticketId = Math.floor(Math.random() * 10000) + 1;
// //     const walletId = Math.floor(Math.random() * 10000) + 1;
// //
// //     // Step 1: Register ticket
// //     const regData = await TicketAPI.registerTicket(ticketId, walletId);
// //     await new Promise(resolve => setTimeout(resolve, 2000));
// //
// //     // Step 2: Redeem ticket
// //     const redeemData = await TicketAPI.redeemTicket(
// //       regData.user_id,
// //       regData.store_id,
// //       ticketId,
// //       walletId
// //     );
// //     await new Promise(resolve => setTimeout(resolve, 2000));
// //
// //     // Step 3: Verify ticket
// //     const verifyData = await TicketAPI.verifyTicket(
// //       redeemData.store_id,
// //       redeemData.party_ids_to_store_ids
// //     );
// //
// //     if (verifyData.result.status !== 1) {
// //       throw new Error("Verification failed");
// //     }
// //
// //     console.log("\n✅ Test completed successfully!");
// //
// //   } catch (error) {
// //     console.error("\n❌ Test failed:", error);
// //     throw error;
// //   }
// // }