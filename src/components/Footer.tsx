import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
	return (
		<Box w="100%" bg="gray.600" p="1em" color="gray.300" position="absolute" bottom={0}>
			<Text textAlign="right">
				github repo @{" "}
				<a href="https://github.com/OmerYesilkaya/bitexen-code-challenge" target="_blank" rel="noreferrer">
					github.com/OmerYesilkaya/bitexen-code-challenge
				</a>
			</Text>
		</Box>
	);
}
