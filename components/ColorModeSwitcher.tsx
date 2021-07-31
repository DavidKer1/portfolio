import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../hooks";
import { MoonIcon, SunIcon } from "./icons";

type TProps = Omit<IconButtonProps, "aria-label">;
export const ColorModeSwitcher: React.FC<TProps> = (props) => {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("Dark", "Light");
	const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

	const handleClick = () => {
		toggleColorMode();
	};
	return (
		<Tooltip
      label={`${text} mode`}
    >
			<IconButton
				size="md"
				fontSize="md"
				ml={4}
				color="current"
				variant="ghost"
				aria-label={`Switch to ${text} mode`}
				icon={<SwitchIcon />}
				_hover={{
					bg: "none",
				}}
        _focus={{
        }}
        _active={{}}
				onClick={handleClick}
				{...props}
			/>
		</Tooltip>
	);
};
