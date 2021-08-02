import { Hero } from "../components";
import { Box, Container } from "../components/elements";
import { Projects } from "../components";
import { useColorModeValue } from '../hooks';

export default function Home() {
  const bgColor = useColorModeValue("gray.300", "gray.900");
	return (
		//TODO: ADD OPENGRAPH
		<>
			<Box>
				<Container>
					<Hero />
				</Container>
			</Box>
			<Box bg={bgColor} mt={10} py={5} px={5}>
				<Container maxW="container.xl">
					<main>
						<Projects />
					</main>
				</Container>
			</Box>
		</>
	);
}
