// AniList API response types
export type AnimeTitle = {
	readonly romaji?: string;
	readonly english?: string;
	readonly native?: string;
};

export type CoverImage = {
	readonly medium?: string;
	readonly large?: string;
};

export type MediaStatus =
	| "FINISHED"
	| "RELEASING"
	| "NOT_YET_RELEASED"
	| "CANCELLED"
	| "HIATUS";

export type ListStatus =
	| "CURRENT"
	| "COMPLETED"
	| "PAUSED"
	| "DROPPED"
	| "PLANNING"
	| "REPEATING";

export type AnimeMedia = {
	readonly id: number;
	readonly title: AnimeTitle;
	readonly coverImage?: CoverImage;
	readonly averageScore?: number;
	readonly status?: MediaStatus;
	readonly episodes?: number;
	readonly genres?: readonly string[];
	readonly startDate?: {
		readonly year?: number;
		readonly month?: number;
		readonly day?: number;
	};
};

export type AnimeListEntry = {
	readonly media: AnimeMedia;
	readonly score?: number;
	readonly status: ListStatus;
	readonly progress?: number;
	readonly updatedAt?: number;
};

export type AnimeList = readonly AnimeListEntry[];

export type MediaListCollection = {
	readonly MediaListCollection: {
		readonly lists: readonly {
			readonly entries: AnimeList;
		}[];
	};
};

// Comparison specific types
export type CommonAnime = {
	readonly anime: AnimeMedia;
	readonly user1Entry: AnimeListEntry;
	readonly user2Entry: AnimeListEntry;
};

export type UserStats = {
	readonly totalAnime: number;
	readonly completedAnime: number;
	readonly averageScore: number;
	readonly totalEpisodes: number;
};

export type ComparisonResult = {
	readonly user1: string;
	readonly user2: string;
	readonly commonAnime: readonly CommonAnime[];
	readonly user1Stats: UserStats;
	readonly user2Stats: UserStats;
	readonly similarityScore: number;
};

// API types
export type ApiError = {
	readonly type: "api_error" | "network_error" | "unknown_error";
	readonly message: string;
	readonly timestamp: number;
};

export type Result<T, E = ApiError> =
	| { readonly success: true; readonly data: T }
	| { readonly success: false; readonly error: E };
