import React from "react";
import { Title } from "../typography/Title";
import { HomeSection } from "./HomeSection";
import { SimpleGrid, Flex, Stack, Heading, Text } from "../elements";
import { Card } from "../cards";
import Image from "next/image";
const dummyData = [
	{
		title: "Proyecto 1",
		mainImage: "https://picsum.photos/400/200",
		githubUrl: "https://github.com/DavidKer1",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae minima eos accusantium esse praesentium amet nulla? Corporis labore odit quis fuga quasi ipsam! Aperiam excepturi nemo eligendi veritatis! Assumenda, iure.",
	},
	{
		title: "Proyecto 2",
		mainImage: "https://picsum.photos/400/200",
		githubUrl: "https://github.com/DavidKer1",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae minima eos accusantium esse praesentium amet nulla? Corporis labore odit quis fuga quasi ipsam! Aperiam excepturi nemo eligendi veritatis! Assumenda, iure.",
	},
	{
		title: "Proyecto 3",
		mainImage: "https://picsum.photos/400/200",
		githubUrl: "https://github.com/DavidKer1",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae minima eos accusantium esse praesentium amet nulla? Corporis labore odit quis fuga quasi ipsam! Aperiam excepturi nemo eligendi veritatis! Assumenda, iure.",
	},
	{
		title: "Proyecto 4",
		mainImage: "https://picsum.photos/400/200",
		githubUrl: "https://github.com/DavidKer1",
		description:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae minima eos accusantium esse praesentium amet nulla? Corporis labore odit quis fuga quasi ipsam! Aperiam excepturi nemo eligendi veritatis! Assumenda, iure.",
	},
];
export const Projects = () => {
	return (
		<>
			<HomeSection headerTitle="Proyectos" headerPath={"/projects"}>
				<SimpleGrid columns={[1, null, 2, 3]} spacing={4} width="full">
					{dummyData.map(({ title, mainImage, description }) => {
						return (
							<Card key={title}>
								<>
									<Flex
										height={200}
										width="full"
										position="relative"
										borderRadius="md"
										alignSelf="center"
									>
										<Image
											alt={title}
											loader={({ src }) => `${src}`}
											src={mainImage}
											layout="fill"
											objectFit="cover"
											objectPosition="center"
										/>
									</Flex>
									<Stack>
										<Heading size="md" as="strong" textAlign="left">
											{title}
										</Heading>
										<Text as="p" size="sm" textAlign="left">
											{description}
										</Text>
									</Stack>
								</>
							</Card>
						);
					})}
				</SimpleGrid>
			</HomeSection>
		</>
	);
};
