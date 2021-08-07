import { Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_TYPE, API } from "api/constants";
import { AllEpisodesResponse } from "models/Episode";
import EpisodeCard from "./EpisodeCard";
import { useEffect, useState } from "react";
import fetchEpisodes from "api/fetchEpisodes";
import EpisodeNavigationButtons from "./EpisodeNavigationButtons";

export default function EpisodeContainer() {
	const [isSmallerThan1550px, isSmallerThan1200px, isSmallerThan800px] = useMediaQuery([
		"(max-width: 1550px)",
		"(max-width: 1200px)",
		"(max-width: 800px)",
	]);

	const [page, setPage] = useState(1);
	const queryClient = useQueryClient();
	const { data } = useQuery<AllEpisodesResponse>([QUERY_TYPE.EPISODES, page], () => fetchEpisodes(page), {
		keepPreviousData: true,
		staleTime: 5000,
	});

	useEffect(() => {
		if (!data) return;
		// Don't prefetch next page if there is no other next page
		if (page < data.info.pages) {
			queryClient.prefetchQuery([API.EPISODES, page + 1], () => fetchEpisodes(page + 1));
		}
	}, [data, page, queryClient]);

	return (
		<Flex direction="column" h="100%" position="relative">
			{data ? (
				<>
					<Grid
						w="100%"
						templateColumns={
							isSmallerThan800px ? "1fr" : isSmallerThan1200px ? "1fr 1fr" : isSmallerThan1550px ? "repeat(3,1fr)" : "repeat(4,1fr)"
						}
						mt="10px"
						overflow="auto"
						maxH="70vh"
					>
						{data.results.map((episode) => (
							<EpisodeCard key={episode.id} episode={episode} m="0.5em" />
						))}
					</Grid>
					<EpisodeNavigationButtons setPage={setPage} data={data} />
				</>
			) : (
				<Text color="gray.600">Loading...</Text>
			)}
		</Flex>
	);
}
