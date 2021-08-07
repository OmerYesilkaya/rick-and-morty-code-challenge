import { API } from "./constants";
import { get } from "./core";

export default async function fetchEpisodes(page: number) {
	return await get(API.EPISODES + `?page=${page}`).then((res) => res.json());
}
