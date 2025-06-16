import { describe, expect, it } from "vitest";
import type {
	AnimeList,
	AnimeListEntry,
	CommonAnime,
	UserStats,
} from "../../../shared/types";
import {
	calculateCommonAnime,
	calculateSimilarityScore,
	filterCommonAnimeByStatus,
	sortCommonAnimeByScore,
} from "./comparison-service";

const createMockAnimeEntry = (
	id: number,
	title: string,
	score?: number,
	status: "COMPLETED" | "CURRENT" | "DROPPED" = "COMPLETED",
): AnimeListEntry => ({
	media: {
		id,
		title: { romaji: title, english: title, native: title },
		averageScore: 80 + id,
	},
	...(score !== undefined && { score }),
	status,
});

describe("calculateCommonAnime", () => {
	it("should return intersection of anime lists", () => {
		const user1Anime: AnimeList = [
			createMockAnimeEntry(1, "Naruto"),
			createMockAnimeEntry(2, "Bleach"),
			createMockAnimeEntry(3, "One Piece"),
		];

		const user2Anime: AnimeList = [
			createMockAnimeEntry(1, "Naruto"),
			createMockAnimeEntry(4, "Death Note"),
			createMockAnimeEntry(3, "One Piece"),
		];

		const result = calculateCommonAnime(user1Anime, user2Anime);

		expect(result).toHaveLength(2);
		expect(result[0]?.anime.id).toBe(1);
		expect(result[1]?.anime.id).toBe(3);
	});

	it("should handle empty lists", () => {
		expect(calculateCommonAnime([], [])).toEqual([]);
		expect(calculateCommonAnime([createMockAnimeEntry(1, "Test")], [])).toEqual(
			[],
		);
		expect(calculateCommonAnime([], [createMockAnimeEntry(1, "Test")])).toEqual(
			[],
		);
	});

	it("should handle lists with no common anime", () => {
		const user1Anime: AnimeList = [createMockAnimeEntry(1, "Naruto")];
		const user2Anime: AnimeList = [createMockAnimeEntry(2, "Bleach")];

		expect(calculateCommonAnime(user1Anime, user2Anime)).toEqual([]);
	});
});

describe("calculateSimilarityScore", () => {
	it("should calculate similarity score correctly", () => {
		const commonAnime = [
			{
				anime: createMockAnimeEntry(1, "Test").media,
				user1Entry: createMockAnimeEntry(1, "Test"),
				user2Entry: createMockAnimeEntry(1, "Test"),
			},
		];

		const user1Stats: UserStats = {
			totalAnime: 10,
			completedAnime: 8,
			averageScore: 7.5,
			totalEpisodes: 100,
		};
		const user2Stats: UserStats = {
			totalAnime: 5,
			completedAnime: 4,
			averageScore: 8.0,
			totalEpisodes: 50,
		};

		const result = calculateSimilarityScore(
			commonAnime,
			user1Stats,
			user2Stats,
		);

		expect(result).toBe(20); // 1/5 * 100 = 20%
	});

	it("should return 0 when minimum total is 0", () => {
		const emptyCommonAnime: readonly CommonAnime[] = [];
		const user1Stats: UserStats = {
			totalAnime: 0,
			completedAnime: 0,
			averageScore: 0,
			totalEpisodes: 0,
		};
		const user2Stats: UserStats = {
			totalAnime: 5,
			completedAnime: 4,
			averageScore: 8.0,
			totalEpisodes: 50,
		};

		expect(
			calculateSimilarityScore(emptyCommonAnime, user1Stats, user2Stats),
		).toBe(0);
	});
});

describe("sortCommonAnimeByScore", () => {
	it("should sort anime by average score descending", () => {
		const commonAnimeList = [
			{
				anime: { ...createMockAnimeEntry(1, "Low").media, averageScore: 60 },
				user1Entry: createMockAnimeEntry(1, "Low"),
				user2Entry: createMockAnimeEntry(1, "Low"),
			},
			{
				anime: { ...createMockAnimeEntry(2, "High").media, averageScore: 90 },
				user1Entry: createMockAnimeEntry(2, "High"),
				user2Entry: createMockAnimeEntry(2, "High"),
			},
			{
				anime: { ...createMockAnimeEntry(3, "Mid").media, averageScore: 75 },
				user1Entry: createMockAnimeEntry(3, "Mid"),
				user2Entry: createMockAnimeEntry(3, "Mid"),
			},
		];

		const sorted = sortCommonAnimeByScore(commonAnimeList);

		expect(sorted[0]?.anime.averageScore).toBe(90);
		expect(sorted[1]?.anime.averageScore).toBe(75);
		expect(sorted[2]?.anime.averageScore).toBe(60);
	});
});

describe("filterCommonAnimeByStatus", () => {
	it("should filter by completed status", () => {
		const commonAnime = [
			{
				anime: createMockAnimeEntry(1, "Completed").media,
				user1Entry: createMockAnimeEntry(1, "Completed", 8, "COMPLETED"),
				user2Entry: createMockAnimeEntry(1, "Completed", 9, "COMPLETED"),
			},
			{
				anime: createMockAnimeEntry(2, "Dropped").media,
				user1Entry: createMockAnimeEntry(2, "Dropped", 5, "DROPPED"),
				user2Entry: createMockAnimeEntry(2, "Dropped", 4, "DROPPED"),
			},
		];

		const filtered = filterCommonAnimeByStatus(commonAnime, true, false, false);

		expect(filtered).toHaveLength(1);
		expect(filtered[0]?.anime.id).toBe(1);
	});
});
