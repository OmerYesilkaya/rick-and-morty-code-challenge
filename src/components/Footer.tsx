import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
export default function Footer() {
	const [isSmallerThan800px] = useMediaQuery(["(max-width: 800px)"]);

	return (
		<Box w="100%" bg="gray.600" p="1em" color="gray.300">
			<Flex w="100%" justify="flex-end" align="center">
				github repo at
				<a href="https://github.com/OmerYesilkaya/bitexen-code-challenge" target="_blank" rel="noreferrer" style={{ marginLeft: "0.4em" }}>
					{isSmallerThan800px ? <SiGithub size="1.5em" /> : "github.com/OmerYesilkaya/bitexen-code-challenge"}
				</a>
			</Flex>
		</Box>
	);
}
