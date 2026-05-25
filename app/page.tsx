import { AboutSection } from "@/components/about-section"
import { ConnectSection } from "@/components/connect-section"
import { ExperienceSection } from "@/components/experience-section"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<AboutSection />
			<ExperienceSection />
			<ProjectsSection />
			<ConnectSection />
			<Footer />
		</main>
	)
}
