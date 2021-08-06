import { Info } from "./Info";

export type Episode = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: Date;
};

export type AllEpisodesResponse = {
	info: Info;
	results: Episode[];
};
