"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"

const phrases = [
	"I build digital products.",
	"I turn ideas into apps.",
	"I craft beautiful websites.",
	"I design useful products.",
	"I solve with code.",
	"I make products work.",
	"I create web solutions.",
]

export function HeroSection() {
	const [currentPhrase, setCurrentPhrase] = useState(0)
	const [displayText, setDisplayText] = useState("")
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		const phrase = phrases[currentPhrase]
		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					if (displayText.length < phrase.length) {
						setDisplayText(phrase.slice(0, displayText.length + 1))
					} else {
						setTimeout(() => setIsDeleting(true), 2000)
					}
				} else {
					if (displayText.length > 0) {
						setDisplayText(displayText.slice(0, -1))
					} else {
						setIsDeleting(false)
						setCurrentPhrase((prev) => (prev + 1) % phrases.length)
					}
				}
			},
			isDeleting ? 50 : 100,
		)

		return () => clearTimeout(timeout)
	}, [displayText, isDeleting, currentPhrase])

	return (
		<section
			id="home"
			className="min-h-screen max-h-screen flex items-center justify-center px-6 lg:px-8 pt-16"
		>
			<div className="max-w-4xl mx-auto text-center">
				<p className="text-sm uppercase tracking-wider text-muted-foreground mb-8 animate-fade-in">
					Full Stack Developer
				</p>

				<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-delay-1">
					<span className="text-balance">{displayText}</span>
					<span className="animate-pulse">|</span>
				</h1>

				<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-balance animate-fade-in-delay-2">
					I help businesses and founders turn ideas into fast, polished web
					products that look great, work smoothly, and are built to grow.
				</p>

				<div className="flex justify-center items-center gap-3 mb-12 animate-fade-in-delay-3">
					<p className="text-base text-secondary-foreground md:text-xl font-medium">
						Victor Sanchez
					</p>
					<span className="text-muted-foreground">|</span>
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<MapPin className="w-4 h-4" />
							<span>Saltillo Coahuila, MX</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
