import { Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import { API, QUERY_TYPE } from "api/constants";
import { get } from "api/core";
import { MotionFlex } from "components/motion/MotionFlex";
import { Character } from "models/Character";
import { Gender } from "models/Gender";
import { Status } from "models/Status";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

type FilterParams = {
	name: string;
	status: Status | null;
	species: string;
	type: string;
	gender: Gender | null;
};

type CharacterCardProps = {
	charId: string;
	filterParams: FilterParams;
	[x: string]: any; // restProps
};

export default function CharacterCard(props: CharacterCardProps) {
	const { data } = useQuery<Character>(QUERY_TYPE.CHARACTER + props.charId, () =>
		get(API.CHARACTERS + "/" + props.charId).then((res) => res.json())
	);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);

	function handleCharacterClick(id: number) {
		history.push(`/character/${id}`);
	}

	useEffect(() => {
		// character cards decide whether or not to show themselves when there are filters on.
		// normally i would filter the data from the parent. but this api only gives me urls not actual data.

		function getIsVisible(): boolean {
			if (!data) return false;
			const filterParams = props.filterParams;
			const nameFilter = data.name.toLowerCase().includes(filterParams.name.toLowerCase());
			const speciesFilter = data.species.toLowerCase().includes(filterParams.species.toLowerCase());
			const typeFilter = data.type.toLowerCase().includes(filterParams.type.toLowerCase());
			const genderFilter = filterParams.gender === null ? true : filterParams.gender === data.gender;
			const statusFilter = filterParams.status === null ? true : filterParams.status === data.status;

			const finalResult = nameFilter && genderFilter && statusFilter && speciesFilter && typeFilter;
			return finalResult;
		}

		setIsVisible(getIsVisible());
	}, [props.filterParams, data]);

	return data && isVisible ? (
		<Skeleton h="120px" isLoaded={isLoaded}>
			<MotionFlex
				whileHover={{ filter: "brightness(1.2)" }}
				borderRadius="md"
				overflow="hidden"
				h="120px"
				bg="gray.600"
				cursor="pointer"
				onClick={() => handleCharacterClick(parseInt(props.charId))}
			>
				<Image src={data.image} onLoad={() => setIsLoaded(true)} />
				<Flex direction="column" p="1em" w="100%">
					<Text>{data.name.toUpperCase()}</Text>
					<Grid fontFamily="Ubuntu" fontWeight="semibold" w="100%" templateColumns="1fr 1fr ">
						<Text fontSize="sm" color="gray.300">
							Gender: {data.gender}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Status: {data.status}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Species: {data.species}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Type: {data.type ? data.type : "No Info"}
						</Text>
					</Grid>
				</Flex>
			</MotionFlex>
		</Skeleton>
	) : null;
}
