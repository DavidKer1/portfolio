import { AboutSection } from "@/components/about-section"
import { ConnectSection } from "@/components/connect-section"
import { ExperienceSection } from "@/components/experience-section"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<AboutSection />
			<ExperienceSection />
			<ConnectSection />
		</main>
	)
}
