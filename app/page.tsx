import { AboutSection } from "@/components/about-section"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<AboutSection />
		</main>
	)
}
