import { Button, Center } from "@chakra-ui/react";
import { AllEpisodesResponse } from "models/Episode";

type NavigationButtonProps = {
	setPage: React.Dispatch<React.SetStateAction<number>>;
	data: AllEpisodesResponse;
};

export default function EpisodeNavigationButtons({ setPage, data }: NavigationButtonProps) {
	return (
		<Center position="absolute" bottom="3em" w="100%">
			<Button
				w="10%"
				minW="150px"
				onClick={() => setPage((prev) => prev - 1)}
				colorScheme="pink"
				variant={data.info.prev ? "solid" : "outline"}
				isDisabled={!data.info.prev}
			>
				Prev
			</Button>
			<Button
				ml="1em"
				w="10%"
				minW="150px"
				onClick={() => setPage((prev) => prev + 1)}
				colorScheme="pink"
				variant={data.info.next ? "solid" : "outline"}
				isDisabled={!data.info.next}
			>
				Next
			</Button>
		</Center>
	);
}
