import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<AboutSection />
			<ExperienceSection />
		</main>
	)
}
