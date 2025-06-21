import type { AnimeList, MediaListCollection, Result } from "../types";
import { type HttpClient, createAniListClient } from "./client";
import {
	type MediaListCollectionVariables,
	USER_ANIME_LIST_QUERY,
} from "./queries";
import { transformMediaListCollection } from "./transformers";

export type AnimeRepository = {
	readonly getUserAnimeList: (userName: string) => Promise<Result<AnimeList>>;
};

export const createAnimeRepository = (
	httpClient?: HttpClient,
): AnimeRepository => {
	const client = createAniListClient(httpClient);

	const getUserAnimeList = async (
		userName: string,
	): Promise<Result<AnimeList>> => {
		const variables: MediaListCollectionVariables = {
			userName: userName.trim(),
			type: "ANIME",
		};

		const result = await client.graphql<MediaListCollection>({
			query: USER_ANIME_LIST_QUERY,
			variables,
		});

		if (!result.success) {
			return result;
		}

		try {
			const animeList = transformMediaListCollection(result.data);
			return {
				success: true,
				data: animeList,
			};
		} catch (error) {
			return {
				success: false,
				error: {
					type: "unknown_error",
					message:
						error instanceof Error ? error.message : "Failed to transform data",
					timestamp: Date.now(),
				},
			};
		}
	};

	return {
		getUserAnimeList,
	};
};
