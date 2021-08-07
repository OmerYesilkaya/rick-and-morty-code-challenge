import { Button, Flex, Grid, Skeleton, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { API, QUERY_TYPE } from "api/constants";
import { get } from "api/core";
import { DetailParam } from "models/DetailParam";
import { Episode } from "models/Episode";
import { Gender } from "models/Gender";
import { Status } from "models/Status";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import FilterCharacters from "./FilterCharacters";
import { FilterModal } from "./FilterModal";

type EpisodeDetailContainerProps = {
	[x: string]: any; // restProps
};

export default function EpisodeDetailContainer(props: EpisodeDetailContainerProps) {
	const { id } = useParams<DetailParam>();
	const { data, isFetching } = useQuery<Episode>(QUERY_TYPE.EPISODE, () => get(API.EPISODES + "/" + id).then((res) => res.json()));
	const [episodeData, setEpisodeData] = useState<Episode | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [name, setName] = useState<string>("");
	const [status, setStatus] = useState<Status | null>(null);
	const [species, setSpecies] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [gender, setGender] = useState<Gender | null>(null);

	const [isSmallerThan1550px, isSmallerThan1200px, isSmallerThan800px] = useMediaQuery([
		"(max-width: 1550px)",
		"(max-width: 1200px)",
		"(max-width: 800px)",
	]);

	useEffect(() => {
		if (!data) return;
		// setting episode data to null because user would see previous episode's data for a brief amount of time (until new episode's data is fetched).
		setEpisodeData(null);
		// set time out for 100ms to prevent being stuck in loading
		setTimeout(() => {
			setEpisodeData(data);
		}, 100);
	}, [id, data]);

	return (
		<Flex direction="column" h="100%" p="2em" position="relative">
			<FilterModal
				isOpen={isOpen}
				onClose={onClose}
				name={name}
				setName={setName}
				gender={gender}
				setGender={setGender}
				type={type}
				setType={setType}
				species={species}
				setSpecies={setSpecies}
				status={status}
				setStatus={setStatus}
			/>
			{isSmallerThan1200px ? (
				<Button position="absolute" top="2em" right="3em" colorScheme="pink" onClick={onOpen}>
					Filter
				</Button>
			) : (
				<FilterCharacters
					name={name}
					setName={setName}
					gender={gender}
					setGender={setGender}
					type={type}
					setType={setType}
					species={species}
					setSpecies={setSpecies}
					status={status}
					setStatus={setStatus}
				/>
			)}

			<Flex w="100%" justify="space-between">
				<Skeleton w="max-content" isLoaded={!isFetching}>
					<Flex direction="column">
						<Flex direction={isSmallerThan1550px ? "column" : "row"}>
							<Text maxW={isSmallerThan800px ? "70%" : "100%"} fontSize={isSmallerThan1550px ? "md" : "2xl"} mr="0.5em">
								{data?.name}
							</Text>
							<Text fontSize={isSmallerThan1550px ? "md" : "2xl"} color="gray.400">
								{data?.episode}
							</Text>
						</Flex>
						<Text color="gray.400" fontSize={isSmallerThan800px ? "sm" : "md"}>
							{data?.air_date}
						</Text>
					</Flex>
				</Skeleton>
			</Flex>

			<Flex mt="3em" w="100%" direction="column">
				<Flex align="center" justify="space-between">
					<Text fontSize="lg" color="gray.400">
						Characters in the episode
					</Text>
				</Flex>

				{episodeData ? (
					<Grid
						mt="1em"
						w="100%"
						templateColumns={
							isSmallerThan800px ? "1fr" : isSmallerThan1200px ? "1fr 1fr" : isSmallerThan1550px ? "repeat(3,1fr)" : "repeat(4,1fr)"
						}
						gap="1em"
						maxH="60vh"
						overflow="auto"
					>
						{episodeData.characters.map((character) => (
							<CharacterCard
								key={character}
								charId={character.split("/")[5]}
								filterParams={{ name: name, status: status, species: species, type: type, gender: gender }}
							/>
						))}
					</Grid>
				) : (
					<Text color="gray.600">Loading...</Text>
				)}
			</Flex>
		</Flex>
	);
}
