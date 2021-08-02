import React, { useState } from "react";
import { Box, Icon } from "../elements";
import { MotionBox } from "../transitions/motion";
import Link from "next/link";
import { LinkIcon } from "../icons";
import { useColorModeValue } from "../../hooks";
type TProps = {
	children: string;
	underlineColor?: string;
	path?: string;
};

const variants = {
	unHover: { scale: 1 },
	hover: { scale: 1.1 },
};
export const Title = ({ children, underlineColor, path, ...props }: TProps) => {
	const [hoverEl, setHoverEl] = useState(false);
	const color = useColorModeValue("blue.700", "blue.300");

	return (
		<Box
			as="h3"
			fontSize="3xl"
			lineHeight="shorter"
			fontWeight="bold"
			fontFamily="heading"
			textAlign="left"
			{...props}
		>
			<Box
				as="span"
				display="inline-block"
				position="relative"
				onMouseEnter={() => setHoverEl(true)}
				onMouseLeave={() => setHoverEl(false)}
			>
				{path ? (
					<Link href={path}>
						<a>
							{children} <Icon as={LinkIcon} w={5} />
						</a>
					</Link>
				) : (
					<>{children}</>
				)}
				<MotionBox
					animate={hoverEl ? "hover" : "unHover"}
					variants={variants}
					as="span"
					display="block"
					position="absolute"
					bg={color}
					w={"100%"}
					h={"1px"}
					bottom={-2}
				/>
			</Box>
		</Box>
	);
};
