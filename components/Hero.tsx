import { Flex } from "@chakra-ui/react";
import Link from "next/link";

import { useColorModeValue } from "../hooks";
import { Text, Avatar } from "./elements";
import { MotionBox } from "./transitions/motion";
export const Hero = () => {
	const jsColor = useColorModeValue("#f0ac01", "#f1e05a");

	return (
		<Flex direction="column" justifyContent="flex-start" w="100%" pt={10}>
			<Text
				fontFamily="heading"
				fontWeight="normal"
				fontSize={["4xl", "5xl", "7xl"]}
				lineHeight={1.1}
				textAlign="center"
			>
				Hola, soy
			</Text>
			<Text
				as="h2"
				fontFamily="heading"
				fontWeight="bold"
				fontSize={["4xl", "5xl", "7xl"]}
				textAlign="center"
			>
				Victor Sanchez
			</Text>
			<MotionBox
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
					transition: {
						duration: 0.5,
					},
				}}
				whileHover={{ scale: 1.1 }}
				whileTap={{
					rotateY: [0, -360, 0],
					scale: [1, 1, 1],
				}}
				mx="auto"
			>
				<Avatar size={"2xl"} src={"/assets/avatar.jpg"} />
			</MotionBox>
			<Text
				as="h3"
				fontFamily="heading"
				fontWeight="normal"
				fontSize={["sm", "md", "lg"]}
				textAlign="center"
				pt={8}
			>
				Desarrollador Frontend y Mobile con conocimientos amplios en
				Backend.
				<br />
				Mi lenguaje principal es{" "}
				<Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
					<a>
						<strong style={{ color: jsColor }}>JavaScript</strong>
					</a>
				</Link>
				, usando tecnologías y frameworks tales como:{" "}
				<Link href="https://reactjs.org/">
					<a>
						<strong style={{ color: "#00d8ff" }}>React</strong>
					</a>
				</Link>{" "}
				,{" "}
				<Link href="https://reactnative.dev/">
					<a>
						<strong style={{ color: "#2db1c9" }}>React Native</strong>
					</a>
				</Link>{" "}
				,{" "}
				<Link href="https://vuejs.org/">
					<a>
						<strong style={{ color: "#42b883" }}>Vue</strong>,
					</a>
				</Link>{" "}
				<Link href="https://nodejs.org/">
					<a>
						<strong style={{ color: "#6cc24a" }}>Node</strong>
					</a>
				</Link>{" "}
				y{" "}
				<Link href="https://graphql.org/">
					<a>
						<strong style={{ color: "#e535ab" }}>GraphQL</strong>.
					</a>
				</Link>
			</Text>
		</Flex>
	);
};
