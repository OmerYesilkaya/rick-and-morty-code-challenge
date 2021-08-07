import { Flex, Grid, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { API, QUERY_TYPE } from "api/constants";
import { get } from "api/core";
import { Episode } from "models/Episode";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CharacterCard from "./CharacterCard";

type DetailParam = {
	id: string | undefined;
};

type EpisodeDetailContainerProps = {
	[x: string]: any; // restProps
};

export default function EpisodeDetailContainer(props: EpisodeDetailContainerProps) {
	const { id } = useParams<DetailParam>();
	const { data, isFetching } = useQuery<Episode>(QUERY_TYPE.EPISODE, () => get(API.EPISODES + "/" + id).then((res) => res.json()));
	const [episodeData, setEpisodeData] = useState<Episode | null>(null);

	useEffect(() => {
		if (!data) return;
		setEpisodeData(data);
	}, [data]);

	useEffect(() => {
		setEpisodeData(null);
	}, [id]);

	return (
		<Flex direction="column" h="100%" p="2em">
			<Skeleton w="max-content" isLoaded={!isFetching}>
				<Flex direction="column">
					<Flex>
						<Text fontSize="2xl" mr="0.5em">
							{data?.name}
						</Text>
						<Text fontSize="2xl" color="gray.400">
							{data?.episode}
						</Text>
					</Flex>
					<Text color="gray.400">{data?.air_date}</Text>
				</Flex>
			</Skeleton>
			<Flex mt="1em" w="100%" direction="column">
				<Text fontSize="lg" color="gray.400">
					Characters in the episode
				</Text>
				{episodeData ? (
					<Grid mt="1em" w="100%" templateColumns="1fr 1fr 1fr 1fr" gap="1em" maxH="60vh" overflow="auto">
						{episodeData.characters.map((character) => (
							<CharacterCard key={character} charId={character.split("/")[5]} />
						))}
					</Grid>
				) : (
					<Text color="gray.600">Loading...</Text>
				)}
			</Flex>
		</Flex>
	);
}
