import React, { useState } from "react";
import { Box, Icon } from "../elements";
import Link from "next/link";
import { LinkIcon } from "../icons";
import { useColorModeValue } from "../../hooks";
import { MotionBox } from "../transitions/motion";
type TProps = {
	children: string;
	path?: string;
	[props: string]: any;
};

const variants = {
	unHover: { scale: 1 },
	hover: { scale: 1.1 },
};
export const Title = ({ children, path }: TProps) => {
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
			mb={8}
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
