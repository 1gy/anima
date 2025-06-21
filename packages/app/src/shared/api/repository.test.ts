import { describe, expect, it, vi } from "vitest";
import type { MediaListCollection, Result } from "../types";
import type { HttpClient } from "./client";
import { createAnimeRepository } from "./repository";

const createMockHttpClient = (): HttpClient => ({
	post: vi.fn(),
});

describe("AnimeRepository", () => {
	it("should fetch user anime list successfully", async () => {
		const mockHttpClient = createMockHttpClient();
		const mockResponse: MediaListCollection = {
			MediaListCollection: {
				lists: [
					{
						entries: [
							{
								media: {
									id: 1,
									title: { romaji: "Test Anime" },
									averageScore: 80,
								},
								score: 8,
								status: "COMPLETED",
							},
						],
					},
				],
			},
		};

		vi.mocked(mockHttpClient.post).mockResolvedValue({
			success: true,
			data: mockResponse,
		} as Result<MediaListCollection>);

		const repository = createAnimeRepository(mockHttpClient);
		const result = await repository.getUserAnimeList("testuser");

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toHaveLength(1);
			expect(result.data[0]?.media.id).toBe(1);
		}
	});

	it("should handle API errors", async () => {
		const mockHttpClient = createMockHttpClient();

		vi.mocked(mockHttpClient.post).mockResolvedValue({
			success: false,
			error: {
				type: "api_error",
				message: "User not found",
				timestamp: Date.now(),
			},
		});

		const repository = createAnimeRepository(mockHttpClient);
		const result = await repository.getUserAnimeList("invaliduser");

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.message).toBe("User not found");
		}
	});

	it("should handle malformed data", async () => {
		const mockHttpClient = createMockHttpClient();

		vi.mocked(mockHttpClient.post).mockResolvedValue({
			success: true,
			data: null,
		} as unknown as Result<MediaListCollection>);

		const repository = createAnimeRepository(mockHttpClient);
		const result = await repository.getUserAnimeList("testuser");

		// null data should be transformed to empty array, so this should succeed
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toEqual([]);
		}
	});

	it("should trim whitespace from user names", async () => {
		const mockHttpClient = createMockHttpClient();
		const mockResponse: MediaListCollection = {
			MediaListCollection: {
				lists: [],
			},
		};

		vi.mocked(mockHttpClient.post).mockResolvedValue({
			success: true,
			data: mockResponse,
		} as Result<MediaListCollection>);

		const repository = createAnimeRepository(mockHttpClient);
		await repository.getUserAnimeList("  testuser  ");

		expect(mockHttpClient.post).toHaveBeenCalledWith(
			"https://graphql.anilist.co",
			expect.objectContaining({
				variables: expect.objectContaining({
					userName: "testuser",
				}),
			}),
		);
	});
});
