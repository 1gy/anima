import { calculateUserStats } from "../../../shared/api";
import type {
	AnimeList,
	CommonAnime,
	ComparisonResult,
	UserStats,
} from "../../../shared/types";

export const calculateCommonAnime = (
	user1Anime: AnimeList,
	user2Anime: AnimeList,
): readonly CommonAnime[] => {
	// Optimize from O(n×m) to O(n+m) using Map for faster lookup
	const user2Map = new Map(user2Anime.map((entry) => [entry.media.id, entry]));

	const commonAnime: CommonAnime[] = [];

	for (const user1Entry of user1Anime) {
		const user2Entry = user2Map.get(user1Entry.media.id);

		if (user2Entry) {
			commonAnime.push({
				anime: user1Entry.media,
				user1Entry,
				user2Entry,
			});
		}
	}

	return commonAnime;
};

export const calculateSimilarityScore = (
	commonAnime: readonly CommonAnime[],
	user1Stats: UserStats,
	user2Stats: UserStats,
): number => {
	const minTotal = Math.min(user1Stats.totalAnime, user2Stats.totalAnime);
	if (minTotal === 0) return 0;

	return Math.round((commonAnime.length / minTotal) * 100 * 100) / 100;
};

export const createComparisonResult = (
	user1: string,
	user2: string,
	user1Anime: AnimeList,
	user2Anime: AnimeList,
): ComparisonResult => {
	const commonAnime = calculateCommonAnime(user1Anime, user2Anime);
	const user1Stats = calculateUserStats(user1Anime);
	const user2Stats = calculateUserStats(user2Anime);
	const similarityScore = calculateSimilarityScore(
		commonAnime,
		user1Stats,
		user2Stats,
	);

	return {
		user1,
		user2,
		commonAnime,
		user1Stats,
		user2Stats,
		similarityScore,
	};
};

export const sortCommonAnimeByScore = (
	commonAnime: readonly CommonAnime[],
): readonly CommonAnime[] => {
	return [...commonAnime].sort((a, b) => {
		const scoreA = a.anime.averageScore ?? 0;
		const scoreB = b.anime.averageScore ?? 0;
		return scoreB - scoreA;
	});
};

export const filterCommonAnimeByStatus = (
	commonAnime: readonly CommonAnime[],
	includeCompleted = true,
	includeWatching = true,
	includeDropped = false,
): readonly CommonAnime[] => {
	return commonAnime.filter(({ user1Entry, user2Entry }) => {
		const statuses = [user1Entry.status, user2Entry.status];

		if (includeCompleted && statuses.some((status) => status === "COMPLETED")) {
			return true;
		}

		if (includeWatching && statuses.some((status) => status === "CURRENT")) {
			return true;
		}

		if (includeDropped && statuses.some((status) => status === "DROPPED")) {
			return true;
		}

		return false;
	});
};
