import Link from "next/link";
import { useRouter } from "next/router";
import {
	Box,
	Flex,
	IconButton,
	HStack,
	Stack,
	Avatar,
	Link as UILink,
} from "./elements";
import { CrossIcon, HamburguerIcon, GithubIcon, LinkedinIcon } from "./icons";
import { useDisclosure, useColorModeValue } from "../hooks";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Collapse } from "@chakra-ui/react";

type TLink = {
	name: string;
	path: string;
};
const links = [
	{name:"Inicio", path:"/"},
	{ name: "Proyectos", path: "/projects" },
	{ name: "Sobre mi", path: "/about" },
];

const CustomNavLink = ({ path, name }: TLink) => {
	const router = useRouter();
	const isActive = router.pathname === path;
	const colorLink = useColorModeValue("blue.500", "blue.200");
	return (
		<Link href={path} passHref>
			<UILink
				px={2}
				py={1}
				rounded={"md"}
				_hover={{
					textDecoration: "none",
					bg: useColorModeValue("gray.200", "gray.900"),
				}}
				color={isActive ? colorLink : "inherit"}
			>
				{name}
			</UILink>
		</Link>
	);
};
export const TopNav = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	return (
		<Box bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				maxW={800}
				w={["90%", "85%", "80%"]}
				mx="auto"
			>
				<IconButton
					size={"md"}
					rounded={"xl"}
					icon={isOpen ? <CrossIcon /> : <HamburguerIcon />}
					aria-label={"Open Menu"}
					display={["inherit", "inherit", "none"]}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Box display={{ base: "none", md: "flex" }}>
						<Link href={"/"} passHref>
							<Avatar size={"sm"} src={"/assets/avatar.jpg"} as="button"/>
						</Link>
					</Box>
					<HStack
						as={"nav"}
						spacing={4}
						display={{ base: "none", md: "flex" }}
					>
						{links.map((link, index) => (
							<CustomNavLink
								key={index}
								name={link.name}
								path={link.path}
							/>
						))}
					</HStack>
				</HStack>
				<Flex alignItems={"center"}>
					<IconButton
						as={UILink}
						size={"md"}
						href={"https://github.com/DavidKer1"}
						icon={<GithubIcon />}
						aria-label={"Github profile"}
						bg={useColorModeValue("white", "gray.700")}
						_hover={{
							textDecoration: "none",
							bg: useColorModeValue("gray.200", "gray.900"),
						}}
					/>
					<IconButton
						as={UILink}
						size={"md"}
						href={"https://www.linkedin.com/in/victor-sanchez-dev"}
						icon={<LinkedinIcon />}
						ml={1}
						aria-label={"Linkedin profile"}
						bg={useColorModeValue("white", "gray.700")}
						_hover={{
							textDecoration: "none",
							bg: useColorModeValue("gray.200", "gray.900"),
						}}
					/>
					<ColorModeSwitcher justifySelf="flex-end" />
				</Flex>
			</Flex>
			<Collapse in={isOpen}>
				<Box
					pb={4}
					w={["100%", "100%", "80%"]}
					maxW={800}
					display={["inherit", "inherit", "none"]}
					px={4}
				>
					<Stack>
						{links.map((link, index) => (
							<CustomNavLink
								key={index}
								name={link.name}
								path={link.path}
							/>
						))}
					</Stack>
				</Box>
			</Collapse>
		</Box>
	);
};

