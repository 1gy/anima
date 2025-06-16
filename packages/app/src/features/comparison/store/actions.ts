import { atom } from "jotai";
import type { AnimeRepository } from "../../../shared/api";
import { createAnimeRepository } from "../../../shared/api";
import { normalizeUserId, validateUserIds } from "../services";
import { setError$, setUserAnime$, startComparison$ } from "./atoms";

// Repository instance - can be overridden for testing
export const animeRepository$ = atom<AnimeRepository>(createAnimeRepository());

// Action atom for performing comparison
export const performComparison$ = atom(
	null,
	async (get, set, userIds: readonly string[]) => {
		// Validate user IDs
		const validation = validateUserIds(userIds);

		if (!validation.isValid) {
			set(setError$, {
				type: "api_error",
				message: validation.errors.join(", "),
				timestamp: Date.now(),
			});
			return;
		}

		const [rawUser1Id, rawUser2Id] = userIds;
		if (!rawUser1Id || !rawUser2Id) {
			set(setError$, {
				type: "api_error",
				message: "Both user IDs are required",
				timestamp: Date.now(),
			});
			return;
		}

		const user1Id = normalizeUserId(rawUser1Id);
		const user2Id = normalizeUserId(rawUser2Id);

		// Start loading state
		set(startComparison$, { user1Id, user2Id });

		try {
			const repository = get(animeRepository$);

			// Fetch both users' anime lists in parallel
			const [user1Result, user2Result] = await Promise.all([
				repository.getUserAnimeList(user1Id),
				repository.getUserAnimeList(user2Id),
			]);

			// Check for errors
			if (!user1Result.success) {
				set(setError$, {
					...user1Result.error,
					message: `User ${user1Id}: ${user1Result.error.message}`,
				});
				return;
			}

			if (!user2Result.success) {
				set(setError$, {
					...user2Result.error,
					message: `User ${user2Id}: ${user2Result.error.message}`,
				});
				return;
			}

			// Set successful results
			set(setUserAnime$, {
				user1Anime: user1Result.data,
				user2Anime: user2Result.data,
			});
		} catch (error) {
			set(setError$, {
				type: "unknown_error",
				message:
					error instanceof Error ? error.message : "Unexpected error occurred",
				timestamp: Date.now(),
			});
		}
	},
);
