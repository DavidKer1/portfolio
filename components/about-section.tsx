"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLElement>(null)

	const skills = [
		"Web Development",
		"Mobile Development",
		"Backend & APIs",
		"React, Next.js & Vue",
		"Laravel & NestJS",
		"Flutter & React Native",
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
		<section id="about" className="py-32 px-6 lg:px-8" ref={sectionRef}>
			<div className="max-w-6xl mx-auto">
				<h2
					className={`text-sm uppercase tracking-wider text-muted-foreground mb-16 transition-all duration-700 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} flex items-center gap-3 justify-start`}
				>
					<span className="w-8 h-px bg-muted-foreground/30" />
					About Me
				</h2>

				<div className="grid md:grid-cols-2 gap-16">
					<div
						className={`space-y-6 transition-all duration-700 delay-100 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
					>
						<p className="text-lg leading-relaxed text-muted-foreground">
							I’m a passionate and detail-oriented professional with 6 years of
							experience turning ideas into meaningful digital experiences. I
							enjoy working closely with people to understand their goals, solve
							problems, and create work that feels clear, useful, and
							well-crafted.
						</p>
						<p className="text-lg leading-relaxed text-muted-foreground">
							Over the years, I’ve collaborated with different teams,
							businesses, and clients, which has helped me become adaptable,
							reliable, and focused on delivering real value.
						</p>
					</div>

					<div
						className={`transition-all duration-700 delay-200 text-center md:text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
					>
						<h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6">
							Services & Skills
						</h3>
						<ul className="space-y-3">
							{skills.map((skill) => (
								<li
									key={skill}
									className="flex items-center gap-3 text-foreground justify-center md:justify-start"
								>
									<div className="w-1.5 h-1.5 bg-foreground rounded-full" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
