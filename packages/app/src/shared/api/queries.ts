// AniList GraphQL queries
export const USER_ANIME_LIST_QUERY = `
  query MediaListCollection($userName: String, $type: MediaType) {
    MediaListCollection(userName: $userName, type: $type) {
      lists {
        entries {
          media {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              medium
              large
            }
            averageScore
            status
            episodes
            genres
            startDate {
              year
              month
              day
            }
          }
          score
          status
          progress
          updatedAt
        }
      }
    }
  }
`;

export type MediaListCollectionVariables = {
	readonly userName: string;
	readonly type: "ANIME" | "MANGA";
};

export type GraphQLResponse<T> = {
	readonly data?: T;
	readonly errors?: readonly {
		readonly message: string;
		readonly status?: number;
	}[];
};

export type GraphQLRequest = {
	readonly query: string;
	readonly variables?: Record<string, unknown>;
};
