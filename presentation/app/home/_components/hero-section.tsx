import Link from "next/link"
import Image from "next/image"
import { Button } from "@/presentation/components/internal/button"

export default function HeroSection() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Valorant Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">PREMIUM</span>
          <br />
          <span className="text-gradient">VALORANT SKINS</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Elevate your gameplay with the most exclusive and stylish weapon skins. Join thousands of players who dominate
          with style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/skins">
            <Button size="lg" className="w-full sm:w-auto">
              SHOP NOW
            </Button>
          </Link>
          <Link href="/agents">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              EXPLORE AGENTS
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">500+</div>
            <div className="text-gray-400">Premium Skins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">50K+</div>
            <div className="text-gray-400">Happy Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
