import { Stack } from "../elements";
import {useColorModeValue} from '../../hooks'
type TProps={
  children: JSX.Element
}
export const Card = ({ children }: TProps) => {
  const bg = useColorModeValue("gray.50", "gray.700")
	return (
		<Stack
			width="full"
			height="full"
			spacing={5}
			padding={5}
			direction="column"
			alignItems="center"
			borderRadius="md"
      bg={bg}
			borderWidth={0.5}
		>
			{children}
		</Stack>
	);
};
