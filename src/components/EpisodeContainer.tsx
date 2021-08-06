import { Grid, Skeleton } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { QUERY_TYPE, API } from "../api/constants";
import { get } from "../api/core";
import { AllEpisodesResponse } from "../models/Episode";
import EpisodeCard from "./EpisodeCard";

export default function EpisodeContainer() {
	const { isLoading, error, data } = useQuery<AllEpisodesResponse>(QUERY_TYPE.EPISODES, () => get(API.EPISODES).then((res) => res.json()));

	return (
		<Grid w="100%" templateColumns="1fr 1fr 1fr 1fr">
			{data &&
				data.results.map((episode) => (
					<Skeleton m="0.5em" isLoaded={!isLoading}>
						<EpisodeCard key={episode.id} episode={episode} />
					</Skeleton>
				))}
		</Grid>
	);
}
