import { Divider, Flex, Input, Text } from "@chakra-ui/react";
import { Gender } from "models/Gender";
import { Status } from "models/Status";
import GenderInput from "./GenderInput";
import StatusInput from "./StatusInput";

type FilterCharacterProps = {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	species: string;
	setSpecies: React.Dispatch<React.SetStateAction<string>>;
	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	gender: Gender | null;
	setGender: React.Dispatch<React.SetStateAction<Gender | null>>;
	status: Status | null;
	setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
};

export default function FilterCharacters({
	name,
	setName,
	gender,
	setGender,
	species,
	setSpecies,
	type,
	setType,
	status,
	setStatus,
}: FilterCharacterProps) {
	return (
		<Flex position="absolute" top="2em" right="1em" px="1em" fontFamily="Ubuntu" fontWeight="bold" fontSize="sm" w="70vw" justify="flex-end">
			<GenderInput setGender={setGender} gender={gender} />
			<StatusInput setStatus={setStatus} status={status} />

			<Flex direction="column" mr="2em">
				<Text mr="1em" fontSize="md">
					Name
				</Text>
				<Divider />
				<Input
					size="sm"
					mt="0.5em"
					w="300px"
					placeholder="Search for a character name..."
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Flex>
			<Flex direction="column" mr="2em">
				<Text mr="1em" fontSize="md">
					Species
				</Text>
				<Divider />
				<Input
					size="sm"
					mt="0.5em"
					w="300px"
					placeholder="Search for species..."
					value={species}
					onChange={(e) => setSpecies(e.target.value)}
				/>
			</Flex>
			<Flex direction="column">
				<Text mr="1em" fontSize="md">
					Type
				</Text>
				<Divider />
				<Input size="sm" mt="0.5em" w="300px" placeholder="Search for a type..." value={type} onChange={(e) => setType(e.target.value)} />
			</Flex>
		</Flex>
	);
}
