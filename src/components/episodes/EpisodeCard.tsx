import { Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Episode } from "models/Episode";
import { useHistory } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { MotionFlex } from "components/motion/MotionFlex";

type EpisodeCardProps = {
	episode: Episode;
	[x: string]: any; // restProps
};

export default function EpisodeCard(props: EpisodeCardProps) {
	const history = useHistory();
	const [isSmallerThan1550px, isSmallerThan1200px] = useMediaQuery(["(max-width: 1550px)", "(max-width: 1200px)"]);

	function handleOnClick(id: number) {
		history.push(`/episode/${id}`);
	}

	return (
		<MotionFlex
			borderRadius="md"
			boxShadow="lg"
			bg="gray.600"
			p="20px"
			whileHover={{ filter: "brightness(1.2)" }}
			cursor="pointer"
			onClick={() => handleOnClick(props.episode.id)}
			{...props}
		>
			<Flex direction="column">
				<Text mr="1em" color="gray.400">
					{props.episode.episode}
				</Text>
				<Text>
					{isSmallerThan1550px && props.episode.name.length > 20 ? props.episode.name.substring(0, 20) + "..." : props.episode.name}
				</Text>
				{!isSmallerThan1200px && (
					<Text color="gray.500" fontFamily="Ubuntu" fontWeight="semibold" fontSize="md" fontStyle="italic">
						{props.episode.air_date}
					</Text>
				)}
			</Flex>

			<Center ml="auto">
				<MdChevronRight size="1.4em" />
			</Center>
		</MotionFlex>
	);
}
