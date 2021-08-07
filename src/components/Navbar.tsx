import { Flex, Text } from "@chakra-ui/react";
import { QUERY_TYPE } from "api/constants";
import { useHistory, useLocation } from "react-router-dom";

export default function Navbar() {
	const history = useHistory();
	const location = useLocation();

	const currentPath = location.pathname.split("/")[1];
	return (
		<Flex p="1em" shadow="lg" w="100%" bg="gray.700" justify="space-between" align="center">
			<Text fontSize="2xl">Rick and Morty Code Challenge</Text>

			<Flex justify="space-between">
				<Text
					mr="1em"
					cursor="pointer"
					onClick={() => history.push("/character/1")}
					textDecoration={currentPath === QUERY_TYPE.CHARACTERS ? "underline" : "none"}
				>
					Characters
				</Text>
				<Text
					cursor="pointer"
					onClick={() => history.push("/episode")}
					textDecoration={currentPath === QUERY_TYPE.EPISODES ? "underline" : "none"}
				>
					Episodes
				</Text>
			</Flex>
		</Flex>
	);
}
