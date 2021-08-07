export const BASE_URL = "https://rickandmortyapi.com/api";

export const QUERY_TYPE = {
	EPISODES: "episode",
	LOCATIONS: "location",
	CHARACTERS: "character",
	EPISODE: "episodeDetails",
	CHARACTER: "characterDetails",
};

export const API = {
	EPISODES: BASE_URL + "/" + QUERY_TYPE.EPISODES,
	LOCATIONS: BASE_URL + "/" + QUERY_TYPE.LOCATIONS,
	CHARACTERS: BASE_URL + "/" + QUERY_TYPE.CHARACTERS,
};
