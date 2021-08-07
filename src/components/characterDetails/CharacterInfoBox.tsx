import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type CharacterInfoBoxProps = {
	label: string;
};

export const CharacterInfoBox: React.FC<CharacterInfoBoxProps> = ({ label, children }) => {
	return (
		<Flex bg="gray.600" color="gray.300" p="0.5em" px="1em" borderRadius="md">
			<Text color="white">{label}</Text> : {children}
		</Flex>
	);
};
