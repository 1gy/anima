import type { Result } from "../types";
import type { GraphQLRequest, GraphQLResponse } from "./queries";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";

export const createHttpClient = () => {
	const post = async <T>(
		url: string,
		body: GraphQLRequest,
		options: RequestInit = {},
	): Promise<Result<T>> => {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
				body: JSON.stringify(body),
				...options,
			});

			if (!response.ok) {
				return {
					success: false,
					error: {
						type: "api_error",
						message: `HTTP ${response.status}: ${response.statusText}`,
						timestamp: Date.now(),
					},
				};
			}

			const data = (await response.json()) as GraphQLResponse<T>;

			if (data.errors && data.errors.length > 0 && data.errors[0]) {
				return {
					success: false,
					error: {
						type: "api_error",
						message: data.errors[0].message,
						timestamp: Date.now(),
					},
				};
			}

			if (!data.data) {
				return {
					success: false,
					error: {
						type: "api_error",
						message: "No data returned from API",
						timestamp: Date.now(),
					},
				};
			}

			return {
				success: true,
				data: data.data,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";

			return {
				success: false,
				error: {
					type: error instanceof TypeError ? "network_error" : "unknown_error",
					message: errorMessage,
					timestamp: Date.now(),
				},
			};
		}
	};

	return { post };
};

export type HttpClient = ReturnType<typeof createHttpClient>;

export const createAniListClient = (
	httpClient: HttpClient = createHttpClient(),
) => ({
	graphql: <T>(request: GraphQLRequest): Promise<Result<T>> =>
		httpClient.post<T>(ANILIST_ENDPOINT, request),
});
