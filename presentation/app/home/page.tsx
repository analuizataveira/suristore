import Header from "@/presentation/layout/header"
import Footer from "@/presentation/layout/footer"
import HeroSection from "./_components/hero-section"
import PopularSkinsSection from "./_components/popular-skins-section"
import FeaturesSection from "./_components/features-section"

function HomePage() {
  return (
    <div id="home-page" className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <PopularSkinsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
