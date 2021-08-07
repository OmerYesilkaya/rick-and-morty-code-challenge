import { Button, Flex } from "@chakra-ui/react";
import { Character } from "models/Character";
import { DetailParam } from "models/DetailParam";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";

type CharacterNavigationButtonsProps = {
	characterData: Character;
};

export default function CharacterNavigationButtons({ characterData }: CharacterNavigationButtonsProps) {
	const history = useHistory();
	const { id } = useParams<DetailParam>();

	function handlePrevChar() {
		if (!id) return;
		history.push("/character/" + (parseInt(id) - 1));
	}
	function handleNextChar() {
		if (!id) return;
		history.push("/character/" + (parseInt(id) + 1));
	}

	function isPrevDisabled() {
		if (characterData.id === 1) return true;

		return false;
	}
	function isNextDisabled() {
		if (characterData.id === 671) return true;

		return false;
	}
	return (
		<Flex w="100%" justify="center">
			<Button mr="1em" colorScheme="pink" onClick={handlePrevChar} isDisabled={isPrevDisabled()}>
				<MdChevronLeft size="1.3em" />
				Prev Character
			</Button>
			<Button colorScheme="pink" onClick={handleNextChar} isDisabled={isNextDisabled()}>
				Next Character <MdChevronRight size="1.3em" />
			</Button>
		</Flex>
	);
}
