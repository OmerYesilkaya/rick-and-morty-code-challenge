import { Divider, Flex, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { Status } from "models/Status";

type StatusInputProps = {
	status: Status | null;
	setStatus: React.Dispatch<React.SetStateAction<Status | null>>;
};

export default function StatusInput({ status, setStatus }: StatusInputProps) {
	function handleSetValue(value: string) {
		// kind of a hacky way of setting enum value to radio button.
		let result = null;
		switch (value) {
			case Status.Alive:
				result = Status.Alive;
				break;
			case Status.Dead:
				result = Status.Dead;
				break;
			case Status.unknown:
				result = Status.unknown;
				break;
		}
		setStatus(result);
	}
	return (
		<Flex align="left" direction="column" mr="2em">
			<Flex>
				<Text mr="1em" fontSize="md">
					Status
				</Text>
				{/* {status && (
					<MotionCenter onClick={() => setStatus(null)} whileHover={{ transform: "rotate(90deg)" }} cursor="pointer">
						<MdClear />
					</MotionCenter>
				)} */}
			</Flex>

			<Divider />

			<RadioGroup colorScheme="pink" size="sm" fontWeight="light" onChange={(e) => handleSetValue(e)} value={status?.toString()}>
				<VStack align="left" spacing={0}>
					<Radio value={Status.Alive.toString()}>{Status.Alive}</Radio>
					<Radio value={Status.Dead.toString()}>{Status.Dead}</Radio>
					<Radio value={Status.unknown.toString()}>{Status.unknown}</Radio>
				</VStack>
			</RadioGroup>
		</Flex>
	);
}
