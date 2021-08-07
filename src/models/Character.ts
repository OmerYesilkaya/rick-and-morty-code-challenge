import { Gender } from "./Gender";
import { Info } from "./Info";
import { Location } from "./Location";
import { Origin } from "./Origin";
import { Status } from "./Status";

export type Character = {
	id: number;
	name: string;
	status: Status;
	species: string;
	type: string;
	gender: Gender;
	origin: Origin;
	location: Location;
	image: string;
	episode: string[];
	url: string;
	created: Date;
};

export type AllCharactersResponse = {
	info: Info;
	results: Character[];
};
