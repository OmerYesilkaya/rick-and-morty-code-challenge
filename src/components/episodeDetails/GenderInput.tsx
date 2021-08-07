import { Divider, Flex, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { MotionCenter } from "components/motion/MotionCenter";
import { Gender } from "models/Gender";
import { MdClear } from "react-icons/md";

type GenderInputProps = {
	gender: Gender | null;
	setGender: React.Dispatch<React.SetStateAction<Gender | null>>;
};

export default function GenderInput({ gender, setGender }: GenderInputProps) {
	function handleSetValue(value: string) {
		// kind of a hacky way of setting enum value to radio button.
		let result = null;
		switch (value) {
			case Gender.Female:
				result = Gender.Female;
				break;
			case Gender.Male:
				result = Gender.Male;
				break;
			case Gender.Genderless:
				result = Gender.Genderless;
				break;
			case Gender.unknown:
				result = Gender.unknown;
				break;
		}
		setGender(result);
	}
	return (
		<Flex align="left" direction="column" mr="2em">
			<Flex>
				<Text mr="1em" fontSize="md">
					Gender
				</Text>
				{/* {gender && (
					<MotionCenter
						onClick={() => {
							setGender(null);
						}}
						whileHover={{ transform: "rotate(90deg)" }}
						cursor="pointer"
					>
						<MdClear />
					</MotionCenter>
				)} */}
			</Flex>

			<Divider />

			<RadioGroup size="sm" fontWeight="light" onChange={(e) => handleSetValue(e)} value={gender?.toString()}>
				<VStack align="left" spacing={0}>
					<Radio value={Gender.Female.toString()}>{Gender.Female}</Radio>
					<Radio value={Gender.Male.toString()}>{Gender.Male}</Radio>
					<Radio value={Gender.Genderless.toString()}>{Gender.Genderless}</Radio>
					<Radio value={Gender.unknown.toString()}>{Gender.unknown}</Radio>
				</VStack>
			</RadioGroup>
		</Flex>
	);
}
