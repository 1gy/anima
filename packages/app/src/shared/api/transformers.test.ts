import { describe, expect, it } from "vitest";
import type {
	AnimeList,
	AnimeMedia,
	ListStatus,
	MediaListCollection,
} from "../types";
import {
	calculateUserStats,
	getAnimeCoverImage,
	getAnimeDisplayTitle,
	isValidListStatus,
	transformMediaListCollection,
} from "./transformers";

const createMockAnimeMedia = (
	id: number,
	title: string,
	score?: number | undefined,
): AnimeMedia => ({
	id,
	title: { romaji: title, english: `${title} EN`, native: `${title} JP` },
	...(score !== undefined && { averageScore: score }),
	coverImage: { medium: `https://example.com/${id}.jpg` },
	episodes: 12,
});

describe("transformMediaListCollection", () => {
	it("should transform MediaListCollection to AnimeList", () => {
		const collection: MediaListCollection = {
			MediaListCollection: {
				lists: [
					{
						entries: [
							{
								media: createMockAnimeMedia(1, "Anime1", 85),
								score: 8,
								status: "COMPLETED" as ListStatus,
							},
							{
								media: createMockAnimeMedia(2, "Anime2", 70),
								score: 7,
								status: "CURRENT" as ListStatus,
							},
						],
					},
					{
						entries: [
							{
								media: createMockAnimeMedia(3, "Anime3", 90),
								score: 9,
								status: "COMPLETED" as ListStatus,
							},
						],
					},
				],
			},
		};

		const result = transformMediaListCollection(collection);

		expect(result).toHaveLength(3);
		expect(result[0]?.media.id).toBe(1);
		expect(result[1]?.media.id).toBe(2);
		expect(result[2]?.media.id).toBe(3);
	});

	it("should handle null or undefined data", () => {
		expect(
			transformMediaListCollection(null as unknown as MediaListCollection),
		).toEqual([]);
		expect(
			transformMediaListCollection(undefined as unknown as MediaListCollection),
		).toEqual([]);
		expect(transformMediaListCollection({} as MediaListCollection)).toEqual([]);
	});

	it("should handle null or undefined lists", () => {
		const collection = {
			MediaListCollection: {
				lists: null,
			},
		} as unknown as MediaListCollection;

		expect(transformMediaListCollection(collection)).toEqual([]);
	});

	it("should handle lists with null entries", () => {
		const collection: MediaListCollection = {
			MediaListCollection: {
				lists: [
					{
						entries:
							null as unknown as MediaListCollection["MediaListCollection"]["lists"][0]["entries"],
					},
					{
						entries: [
							{
								media: createMockAnimeMedia(1, "Test", 80),
								score: 8,
								status: "COMPLETED" as ListStatus,
							},
						],
					},
				],
			},
		};

		const result = transformMediaListCollection(collection);
		expect(result).toHaveLength(1);
		expect(result[0]?.media.id).toBe(1);
	});

	it("should filter out entries with invalid media", () => {
		const collection: MediaListCollection = {
			MediaListCollection: {
				lists: [
					{
						entries: [
							{
								media: null as unknown as AnimeMedia,
								score: 8,
								status: "COMPLETED" as ListStatus,
							},
							{
								media: createMockAnimeMedia(1, "Valid", 80),
								score: 8,
								status: "COMPLETED" as ListStatus,
							},
							{
								media: { id: null } as unknown as AnimeMedia,
								score: 8,
								status: "COMPLETED" as ListStatus,
							},
						],
					},
				],
			},
		};

		const result = transformMediaListCollection(collection);
		expect(result).toHaveLength(1);
		expect(result[0]?.media.id).toBe(1);
	});
});

describe("calculateUserStats", () => {
	it("should calculate correct user statistics", () => {
		const animeList: AnimeList = [
			{
				media: createMockAnimeMedia(1, "Completed1", 85),
				score: 8,
				status: "COMPLETED" as ListStatus,
			},
			{
				media: createMockAnimeMedia(2, "Completed2", 70),
				score: 9,
				status: "COMPLETED" as ListStatus,
			},
			{
				media: createMockAnimeMedia(3, "Watching", 90),
				score: 0, // Not scored
				status: "CURRENT" as ListStatus,
				progress: 5,
			},
		];

		const stats = calculateUserStats(animeList);

		expect(stats.totalAnime).toBe(3);
		expect(stats.completedAnime).toBe(2);
		expect(stats.averageScore).toBe(8.5); // (8 + 9) / 2
		expect(stats.totalEpisodes).toBe(29); // 12 + 12 + 5 (progress)
	});

	it("should handle empty anime list", () => {
		const stats = calculateUserStats([]);

		expect(stats.totalAnime).toBe(0);
		expect(stats.completedAnime).toBe(0);
		expect(stats.averageScore).toBe(0);
		expect(stats.totalEpisodes).toBe(0);
	});
});

describe("getAnimeDisplayTitle", () => {
	it("should prefer English title", () => {
		const anime = createMockAnimeMedia(1, "Romaji");
		expect(getAnimeDisplayTitle(anime)).toBe("Romaji EN");
	});

	it("should fallback to romaji if no English", () => {
		const anime: AnimeMedia = {
			id: 1,
			title: { romaji: "Romaji Title", native: "Native Title" },
		};
		expect(getAnimeDisplayTitle(anime)).toBe("Romaji Title");
	});

	it("should fallback to native if no English or romaji", () => {
		const anime: AnimeMedia = {
			id: 1,
			title: { native: "Native Title" },
		};
		expect(getAnimeDisplayTitle(anime)).toBe("Native Title");
	});

	it("should fallback to ID if no titles", () => {
		const anime: AnimeMedia = {
			id: 123,
			title: {},
		};
		expect(getAnimeDisplayTitle(anime)).toBe("Anime 123");
	});
});

describe("getAnimeCoverImage", () => {
	it("should return medium image if available", () => {
		const anime = createMockAnimeMedia(1, "Test");
		expect(getAnimeCoverImage(anime)).toBe("https://example.com/1.jpg");
	});

	it("should fallback to large image", () => {
		const anime: AnimeMedia = {
			id: 1,
			title: { romaji: "Test" },
			coverImage: { large: "https://example.com/large.jpg" },
		};
		expect(getAnimeCoverImage(anime)).toBe("https://example.com/large.jpg");
	});

	it("should fallback to default image", () => {
		const anime: AnimeMedia = {
			id: 1,
			title: { romaji: "Test" },
		};
		expect(getAnimeCoverImage(anime)).toBe("/default-cover.jpg");
	});
});

describe("isValidListStatus", () => {
	it("should validate correct statuses", () => {
		expect(isValidListStatus("COMPLETED")).toBe(true);
		expect(isValidListStatus("CURRENT")).toBe(true);
		expect(isValidListStatus("DROPPED")).toBe(true);
		expect(isValidListStatus("PAUSED")).toBe(true);
		expect(isValidListStatus("PLANNING")).toBe(true);
		expect(isValidListStatus("REPEATING")).toBe(true);
	});

	it("should reject invalid statuses", () => {
		expect(isValidListStatus("INVALID")).toBe(false);
		expect(isValidListStatus("completed")).toBe(false); // lowercase
		expect(isValidListStatus("")).toBe(false);
	});
});
