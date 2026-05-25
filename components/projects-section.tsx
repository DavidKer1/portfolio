"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ProjectsSection() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLElement>(null)

	const projects = [
		{
			title: "Apuntafy",
			tags: ["Founder", "Development", "SaaS"],
			image: "/apuntafy.webp",
			url: "https://apuntafy.com",
		},
		{
			title: "Peoplecor",
			tags: ["Frontend", "Backend", "Mobile", "SaaS", "HRM"],
			image: "/peoplecor.webp",
			url: "https://peoplecor.com",
		},
		{
			title: "Zenlift",
			tags: ["Founder", "Development", "Mobile"],
			image: "/zenlift.webp",
			url: "https://zenlift.app",
		},
		{
			title: "Sonrisas Mexicanas",
			tags: ["Frontend", "Backend", "Mobile", "HealthTech"],
			image: "/sonrisasmexicanas.webp",
			url: "https://play.google.com/store/apps/details?id=com.sonrisasmexicanas&pcampaignid=web_share",
		},
		{
			title: "Scholastico",
			tags: ["Mobile", "Backend", "Location Tracking", "EdTech"],
			image: "/scholastico.webp",
			url: "https://play.google.com/store/apps/details?id=com.scholastico.mobile",
		},
	]

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.1 },
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<section id="projects" className="py-32 px-6 lg:px-8" ref={sectionRef}>
			<div className="max-w-6xl mx-auto">
				<h2
					className={`text-sm uppercase tracking-wider text-muted-foreground mb-16 transition-all duration-700 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
				>
					Selected Work
				</h2>

				<div className="grid md:grid-cols-2 gap-16  md:gap-8">
					{projects.map((project, index) => (
						<a
							key={index}
							href={project.url || "#"}
							target="_blank"
							className={`group cursor-pointer transition-all duration-700 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
							style={{ transitionDelay: `${(index + 1) * 100}ms` }}
						>
							<div className="relative overflow-hidden rounded-lg mb-4 bg-muted aspect-3/2 border">
								<Image
									src={project.image || "/placeholder.svg"}
									alt={project.title}
									fill
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
							</div>
							<h3 className="text-xl font-semibold mb-3">{project.title}</h3>
							<div className="flex flex-wrap gap-2 justify-center md:justify-start">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	)
}
