import { Image, Center, Text, Flex, Grid, Skeleton, Divider } from "@chakra-ui/react";
import { API, QUERY_TYPE } from "api/constants";
import { get } from "api/core";
import { MotionFlex } from "components/motion/MotionFlex";
import { Character } from "models/Character";
import { DetailParam } from "models/DetailParam";
import { Gender } from "models/Gender";
import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { CharacterInfoBox } from "./CharacterInfoBox";
import CharacterNavigationButtons from "./CharacterNavigationButtons";

export default function CharacterDetailContainer() {
	const { id } = useParams<DetailParam>();
	const history = useHistory();

	const { data } = useQuery<Character>(QUERY_TYPE.CHARACTER + id, () => get(API.CHARACTERS + "/" + id).then((res) => res.json()));
	const [characterData, setCharacterData] = useState<Character | null>(null);

	useEffect(() => {
		if (!data) return;
		setCharacterData(data);
	}, [data]);

	return (
		<Center h="100%">
			<Flex direction="column">
				<Flex direction="column" border="2px solid white" borderRadius="md" overflow="hidden" m="1em">
					<Flex
						bg={characterData?.gender === Gender.Male ? "teal.500" : "pink.500"}
						w="100%"
						direction="column"
						align="center"
						p="1em"
						pb="0"
					>
						{data ? (
							<Image src={data?.image} borderRadius="full" h="150px" w="150px" border="2px solid white" boxShadow="dark-lg" />
						) : (
							<Skeleton h="150px" w="150px" borderRadius="full" />
						)}

						<Text fontSize="2xl" my="0.5em">
							{characterData?.name}
						</Text>
					</Flex>

					<Grid templateColumns="1fr 1fr" gap="0.5em" p="1em">
						<CharacterInfoBox label="Gender">{characterData?.gender}</CharacterInfoBox>
						<CharacterInfoBox label="Species">{characterData?.species}</CharacterInfoBox>
						<CharacterInfoBox label="Origin">{characterData?.origin.name}</CharacterInfoBox>
						<CharacterInfoBox label="Location">{characterData?.location.name}</CharacterInfoBox>
						<CharacterInfoBox label="Status">{characterData?.status}</CharacterInfoBox>
						<CharacterInfoBox label="Type">{characterData?.type ? characterData?.type : "No Info"}</CharacterInfoBox>
					</Grid>

					<Flex px="1em">
						<Divider />
					</Flex>

					<Grid templateColumns="1fr 1fr" gap="0.5em" p="1em" maxH="250px" overflow="auto">
						{characterData?.episode.map((ep) => {
							const episodeID = ep.split("/")[5];
							return (
								<MotionFlex
									key={episodeID}
									whileHover={{ filter: "brightness(1.3)" }}
									borderRadius="md"
									cursor="pointer"
									align="center"
									bg="gray.600"
									p="0.5em"
									onClick={() => history.push("/episode/" + episodeID)}
								>
									Episode {episodeID} <MdChevronRight />
								</MotionFlex>
							);
						})}
					</Grid>
				</Flex>
				{characterData && <CharacterNavigationButtons characterData={characterData} />}
			</Flex>
		</Center>
	);
}
