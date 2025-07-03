"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SkinsRepository } from "@/data/repositories/skins-repository"
import type { Skin } from "@/domain/interfaces/skin"
import SkinCard from "@/presentation/app/skins/_components/skin-card"
import { Button } from "@/presentation/components/internal/button"

export default function PopularSkinsSection() {
  const [skins, setSkins] = useState<Skin[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPopularSkins = async () => {
      try {
        const popularSkins = await SkinsRepository.getPopularSkins()
        setSkins(popularSkins)
      } catch (error) {
        console.error("Failed to load popular skins:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPopularSkins()
  }, [])

  return (
    <section id="popular-skins-section" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Most Popular Skins</h2>
          <p className="text-gray-400 text-lg">The community's favorite weapon skins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-800 aspect-[4/3] rounded-lg mb-4"></div>
                  <div className="bg-gray-800 h-4 rounded mb-2"></div>
                  <div className="bg-gray-800 h-4 rounded w-2/3 mb-2"></div>
                  <div className="bg-gray-800 h-6 rounded w-1/2"></div>
                </div>
              ))
            : skins.map((skin) => <SkinCard key={skin.id} skin={skin} />)}
        </div>

        <div className="text-center">
          <Link href="/skins">
            <Button size="lg">VIEW ALL SKINS</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
