import type {
	AnimeList,
	AnimeListEntry,
	AnimeMedia,
	ListStatus,
	MediaListCollection,
	UserStats,
} from "../types";

export const transformMediaListCollection = (
	data: MediaListCollection,
): AnimeList => {
	if (
		!data ||
		!data.MediaListCollection ||
		!data.MediaListCollection.lists ||
		!Array.isArray(data.MediaListCollection.lists)
	) {
		return [];
	}

	const allEntries = data.MediaListCollection.lists.flatMap((list) => {
		if (!list || !list.entries || !Array.isArray(list.entries)) {
			return [];
		}
		return list.entries;
	});

	return allEntries.filter(
		(entry): entry is AnimeListEntry =>
			entry != null &&
			entry.media != null &&
			entry.media.id != null &&
			typeof entry.media.id === "number",
	);
};

export const calculateUserStats = (animeList: AnimeList): UserStats => {
	const completedAnime = animeList.filter(
		(entry) => entry.status === "COMPLETED",
	);
	const totalEpisodes = animeList.reduce((sum, entry) => {
		const episodes = entry.media.episodes ?? 0;
		const progress = entry.progress ?? 0;
		return sum + (entry.status === "COMPLETED" ? episodes : progress);
	}, 0);

	const scoredAnime = animeList.filter(
		(entry) => entry.score != null && entry.score > 0,
	);

	const averageScore =
		scoredAnime.length > 0
			? scoredAnime.reduce((sum, entry) => sum + (entry.score ?? 0), 0) /
				scoredAnime.length
			: 0;

	return {
		totalAnime: animeList.length,
		completedAnime: completedAnime.length,
		averageScore: Math.round(averageScore * 100) / 100,
		totalEpisodes,
	};
};

export const getAnimeDisplayTitle = (anime: AnimeMedia): string => {
	return (
		anime.title.english ??
		anime.title.romaji ??
		anime.title.native ??
		`Anime ${anime.id}`
	);
};

export const getAnimeCoverImage = (anime: AnimeMedia): string => {
	return (
		anime.coverImage?.medium ?? anime.coverImage?.large ?? "/default-cover.jpg"
	);
};

export const isValidListStatus = (status: string): status is ListStatus => {
	const validStatuses: ListStatus[] = [
		"CURRENT",
		"COMPLETED",
		"PAUSED",
		"DROPPED",
		"PLANNING",
		"REPEATING",
	];
	return validStatuses.includes(status as ListStatus);
};
