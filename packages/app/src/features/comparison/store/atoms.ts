import { atom } from "jotai";
import type {
	AnimeList,
	ApiError,
	ComparisonResult,
} from "../../../shared/types";
import { createComparisonResult } from "../services";
import type { ComparisonState } from "../types";

// Primitive atoms for user data
export const user1Id$ = atom<string>("");
export const user2Id$ = atom<string>("");
export const user1Anime$ = atom<AnimeList>([]);
export const user2Anime$ = atom<AnimeList>([]);

// Loading and error state atoms
export const isLoading$ = atom<boolean>(false);
export const error$ = atom<ApiError | undefined>(undefined);

// Derived atom for comparison result
export const comparisonResult$ = atom<ComparisonResult | undefined>((get) => {
	const user1Id = get(user1Id$);
	const user2Id = get(user2Id$);
	const user1Anime = get(user1Anime$);
	const user2Anime = get(user2Anime$);

	if (
		!user1Id ||
		!user2Id ||
		user1Anime.length === 0 ||
		user2Anime.length === 0
	) {
		return undefined;
	}

	return createComparisonResult(user1Id, user2Id, user1Anime, user2Anime);
});

// Derived atom for complete comparison state
export const comparisonState$ = atom<ComparisonState>((get) => {
	const user1Id = get(user1Id$);
	const user2Id = get(user2Id$);
	const result = get(comparisonResult$);
	const isLoading = get(isLoading$);
	const error = get(error$);

	return {
		userIds: user1Id && user2Id ? [user1Id, user2Id] : [],
		isLoading,
		result,
		error,
	};
});

// Write-only atom for clearing comparison data
export const clearComparison$ = atom(null, (_get, set) => {
	set(user1Id$, "");
	set(user2Id$, "");
	set(user1Anime$, []);
	set(user2Anime$, []);
	set(error$, undefined);
	set(isLoading$, false);
});

// Write-only atom for setting error
export const setError$ = atom(
	null,
	(_get, set, error: ApiError | undefined) => {
		set(error$, error);
		set(isLoading$, false);
	},
);

// Write-only atom for starting comparison
export const startComparison$ = atom(
	null,
	(_get, set, { user1Id, user2Id }: { user1Id: string; user2Id: string }) => {
		set(user1Id$, user1Id);
		set(user2Id$, user2Id);
		set(isLoading$, true);
		set(error$, undefined);
	},
);

// Write-only atom for setting user anime data
export const setUserAnime$ = atom(
	null,
	(
		_get,
		set,
		{
			user1Anime,
			user2Anime,
		}: { user1Anime: AnimeList; user2Anime: AnimeList },
	) => {
		set(user1Anime$, user1Anime);
		set(user2Anime$, user2Anime);
		set(isLoading$, false);
	},
);
