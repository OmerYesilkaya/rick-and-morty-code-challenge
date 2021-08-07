import { Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import { API, QUERY_TYPE } from "api/constants";
import { get } from "api/core";
import { MotionFlex } from "components/motion/MotionFlex";
import { Character } from "models/Character";
import { useState } from "react";
import { useQuery } from "react-query";

type CharacterCardProps = {
	charId: string;
	[x: string]: any; // restProps
};

export default function CharacterCard(props: CharacterCardProps) {
	const { data } = useQuery<Character>(QUERY_TYPE.CHARACTER + props.charId, () =>
		get(API.CHARACTERS + "/" + props.charId).then((res) => res.json())
	);
	const [isLoaded, setIsLoaded] = useState(false);

	function handleCharacterClick() {
		return;
	}

	return data ? (
		<Skeleton h="120px" isLoaded={isLoaded}>
			<MotionFlex
				whileHover={{ filter: "brightness(1.2)" }}
				borderRadius="md"
				overflow="hidden"
				h="120px"
				bg="gray.600"
				cursor="pointer"
				onClick={() => handleCharacterClick()}
			>
				<Image src={data.image} onLoad={() => setIsLoaded(true)} />
				<Flex direction="column" p="1em" w="100%">
					<Text>{data.name.toUpperCase()}</Text>
					<Grid fontFamily="Source Sans Pro" fontWeight="semibold" w="100%" templateColumns="1fr 1fr ">
						<Text fontSize="sm" color="gray.300">
							Gender: {data.gender}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Species: {data.species}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Status: {data.status}
						</Text>
						<Text fontSize="sm" color="gray.300">
							Location: {data.location.name.length > 12 ? data.location.name.substring(0, 9) + "..." : data.location.name}
						</Text>
					</Grid>
				</Flex>
			</MotionFlex>
		</Skeleton>
	) : null;
}
