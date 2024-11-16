import axios from "axios";
import crypto from "crypto";

const API_BASE = "https://nillion-storage-apis-v0.onrender.com";

interface NillionConfig {
	appId: string;
	contractName: string;
}

interface SecretPayload {
	secret: {
		nillion_seed: string;
		secret_value: string;
		secret_name: string;
	};
	permissions: {
		retrieve: string[];
		update: string[];
		delete: string[];
		compute: Record<string, unknown>;
	};
}

const hashStr = (str: string): string => {
	return crypto.createHash("sha256").update(str).digest("hex");
};

export const getUserId = async (contractName: string) => {
	try {
		const response = await axios.post(
			`${API_BASE}/api/user`,
			{ nillion_seed: contractName },
			{ headers: { "Content-Type": "application/json" } },
		);
		return response.data.nillion_user_id;
	} catch (error) {
		console.error("Error fetching user ID:", error);
		throw error;
	}
};

export const storeSecret = async (
	{ appId, contractName }: NillionConfig,
	secretValue: string,
) => {
	try {
		const payload: SecretPayload = {
			secret: {
				nillion_seed: contractName,
				secret_value: secretValue,
				secret_name: hashStr(secretValue),
			},
			permissions: {
				retrieve: [],
				update: [],
				delete: [],
				compute: {},
			},
		};

		const response = await axios.post(
			`${API_BASE}/api/apps/${appId}/secrets`,
			payload,
			{ headers: { "Content-Type": "application/json" } },
		);
		return response.data;
	} catch (error) {
		console.error("Error storing secret:", error);
		throw error;
	}
};

export const retrieveSecret = async (
	{ contractName }: NillionConfig,
	storeId: string,
	secretName: string,
	index: number,
) => {
	try {
		const response = await axios.get(
			`${API_BASE}/api/secret/retrieve/${storeId}`,
			{
				params: {
					retrieve_as_nillion_user_seed: contractName,
					secret_name: secretName,
				},
			},
		);
		const secret = response.data.secret;
		return secret ? secret.split(",")[index] : null;
	} catch (error) {
		console.error("Error retrieving secret:", error);
		throw error;
	}
};