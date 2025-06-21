import { http, HttpResponse } from "msw";

// Mock data for AniList API responses
const mockUserAnimeList = {
	data: {
		MediaListCollection: {
			lists: [
				{
					entries: [
						{
							media: {
								id: 1,
								title: {
									romaji: "Attack on Titan",
									english: "Attack on Titan",
									native: "進撃の巨人",
								},
								coverImage: {
									medium:
										"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16498-buvcRTBx4NSm.jpg",
								},
								averageScore: 84,
								episodes: 25,
								genres: ["Action", "Drama"],
							},
							score: 9,
							status: "COMPLETED",
							progress: 25,
						},
						{
							media: {
								id: 2,
								title: {
									romaji: "Demon Slayer",
									english: "Demon Slayer: Kimetsu no Yaiba",
									native: "鬼滅の刃",
								},
								coverImage: {
									medium:
										"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx101922-PEn1CTc93blC.jpg",
								},
								averageScore: 83,
								episodes: 26,
								genres: ["Action", "Supernatural"],
							},
							score: 8,
							status: "COMPLETED",
							progress: 26,
						},
					],
				},
			],
		},
	},
};

const mockUser2AnimeList = {
	data: {
		MediaListCollection: {
			lists: [
				{
					entries: [
						{
							media: {
								id: 1, // Common with user1
								title: {
									romaji: "Attack on Titan",
									english: "Attack on Titan",
									native: "進撃の巨人",
								},
								coverImage: {
									medium:
										"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16498-buvcRTBx4NSm.jpg",
								},
								averageScore: 84,
								episodes: 25,
								genres: ["Action", "Drama"],
							},
							score: 10,
							status: "COMPLETED",
							progress: 25,
						},
						{
							media: {
								id: 3, // Different from user1
								title: {
									romaji: "One Piece",
									english: "One Piece",
									native: "ワンピース",
								},
								coverImage: {
									medium:
										"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx21-YCDNcrXKaAN7.jpg",
								},
								averageScore: 89,
								episodes: 1000,
								genres: ["Action", "Adventure"],
							},
							score: 9,
							status: "CURRENT",
							progress: 500,
						},
					],
				},
			],
		},
	},
};

const mockEmptyUserAnimeList = {
	data: {
		MediaListCollection: {
			lists: [],
		},
	},
};

const mockErrorResponse = {
	errors: [
		{
			message: "User not found",
			status: 404,
		},
	],
};

export const handlers = [
	http.post("https://graphql.anilist.co", async ({ request }) => {
		const body = (await request.json()) as {
			query: string;
			variables: { userName: string; type: string };
		};
		const { variables } = body;

		// Simulate different responses based on userName
		switch (variables.userName) {
			case "testuser1":
				return HttpResponse.json(mockUserAnimeList);

			case "testuser2":
				return HttpResponse.json(mockUser2AnimeList);

			case "emptyuser":
				return HttpResponse.json(mockEmptyUserAnimeList);

			case "erroruser":
				return HttpResponse.json(mockErrorResponse, { status: 404 });

			case "invalidresponse":
				return HttpResponse.json({ data: null });

			case "malformedresponse":
				return HttpResponse.json({ data: { MediaListCollection: null } });

			default:
				return HttpResponse.json(mockErrorResponse, { status: 404 });
		}
	}),

	// Handle network error test case
	http.post("https://invalid-url-that-does-not-exist.com", () => {
		return HttpResponse.error();
	}),
];
