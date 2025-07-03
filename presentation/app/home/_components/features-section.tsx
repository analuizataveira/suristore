import { Shield, Zap, Star, Users } from "lucide-react"
import { Card } from "@/presentation/components/internal/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All purchases are protected with enterprise-grade security",
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get your skins immediately after purchase",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Only the highest quality and most sought-after skins",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Curated by the Valorant community for the community",
    },
  ]

  return (
    <section id="features-section" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-gray-400 text-lg">The best Valorant skin shopping experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="hover" className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
