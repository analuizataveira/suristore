"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import type { Skin } from "@/domain/interfaces/skin"
import { Card } from "@/presentation/components/internal/card"
import { Button } from "@/presentation/components/internal/button"
import { useCartStore } from "@/data/stores/cart-store"

interface SkinCardProps {
  skin: Skin
}

export default function SkinCard({ skin }: SkinCardProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(skin)
  }

  const getRarityColor = (rarity: string) => {
    const colors = {
      select: "text-green-400",
      deluxe: "text-blue-400",
      premium: "text-purple-400",
      ultra: "text-yellow-400",
      exclusive: "text-red-400",
    }
    return colors[rarity as keyof typeof colors] || "text-gray-400"
  }

  return (
    <Card id={`skin-card-${skin.id}`} variant="hover" className="group">
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-800">
        <div className="aspect-[4/3] relative">
          <Image
            src={skin.image || "/placeholder.svg"}
            alt={skin.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=300&width=400"
            }}
          />
        </div>
        {skin.isPopular && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
            POPULAR
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">{skin.name}</h3>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">{skin.weapon}</span>
          <span className={`text-sm font-medium uppercase ${getRarityColor(skin.rarity)}`}>{skin.rarity}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-2xl font-bold text-red-400">{skin.price.toLocaleString()} VP</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
