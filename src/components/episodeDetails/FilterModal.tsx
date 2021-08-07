import {
	Button,
	Divider,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { Gender } from "models/Gender";
import { Status } from "models/Status";
import GenderInput from "./GenderInput";
import StatusInput from "./StatusInput";

type FilterModalProps = {
	onClose: () => void;
	isOpen: boolean;
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

export function FilterModal({
	onClose,
	isOpen,
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
}: FilterModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="full">
			<ModalOverlay />
			<ModalContent mx="10%" minH="600px" color="gray.300" bg="gray.800">
				<ModalHeader>Filter Characters</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex fontFamily="Ubuntu" fontWeight="bold" fontSize="sm" justify="center" direction="column">
						<Flex direction="column" mb="1em">
							<Text fontSize="md">Name</Text>
							<Divider />
							<Input
								size="sm"
								mt="0.5em"
								w="100%"
								placeholder="Search for a character name..."
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Flex>
						<Flex direction="column" mb="1em">
							<Text fontSize="md">Species</Text>
							<Divider />
							<Input
								size="sm"
								mt="0.5em"
								w="100%"
								placeholder="Search for species..."
								value={species}
								onChange={(e) => setSpecies(e.target.value)}
							/>
						</Flex>
						<Flex direction="column" mb="1em">
							<Text fontSize="md">Type</Text>
							<Divider />
							<Input
								size="sm"
								mt="0.5em"
								w="100%"
								placeholder="Search for a type..."
								value={type}
								onChange={(e) => setType(e.target.value)}
							/>
						</Flex>

						<Flex w="100%">
							<GenderInput setGender={setGender} gender={gender} />
							<StatusInput setStatus={setStatus} status={status} />
						</Flex>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" colorScheme="pink" onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
