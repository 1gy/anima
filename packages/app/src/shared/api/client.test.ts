import { describe, expect, it } from "vitest";
import { createAniListClient, createHttpClient } from "./client";

describe("HttpClient", () => {
	it("should handle successful requests", async () => {
		const client = createHttpClient();

		const result = await client.post("https://graphql.anilist.co", {
			query: `query MediaListCollection($userName: String, $type: MediaType) {
        MediaListCollection(userName: $userName, type: $type) {
          lists {
            entries {
              media {
                id
                title {
                  romaji
                }
              }
            }
          }
        }
      }`,
			variables: {
				userName: "testuser1",
				type: "ANIME",
			},
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBeDefined();
		}
	});

	it("should handle GraphQL errors", async () => {
		const client = createHttpClient();

		const result = await client.post("https://graphql.anilist.co", {
			query: `query MediaListCollection($userName: String, $type: MediaType) {
        MediaListCollection(userName: $userName, type: $type) {
          lists {
            entries {
              media {
                id
                title {
                  romaji
                }
              }
            }
          }
        }
      }`,
			variables: {
				userName: "erroruser",
				type: "ANIME",
			},
		});

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.type).toBe("api_error");
			expect(result.error.message).toBeDefined();
		}
	});

	it("should handle network errors", async () => {
		const client = createHttpClient();

		// Use fetch directly with invalid URL to simulate network error
		const result = await client.post(
			"https://invalid-url-that-does-not-exist.com",
			{
				query: "query test",
			},
		);

		expect(result.success).toBe(false);
		if (!result.success) {
			expect(["network_error", "unknown_error"]).toContain(result.error.type);
		}
	});
});

describe("AniListClient", () => {
	it("should make GraphQL requests", async () => {
		const client = createAniListClient();

		const result = await client.graphql({
			query: `query MediaListCollection($userName: String, $type: MediaType) {
        MediaListCollection(userName: $userName, type: $type) {
          lists {
            entries {
              media {
                id
                title {
                  romaji
                }
              }
            }
          }
        }
      }`,
			variables: {
				userName: "testuser1",
				type: "ANIME",
			},
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBeDefined();
		}
	});
});
