"use client"

import { useEffect, useState } from "react"
import { SkinsRepository } from "@/data/repositories/skins-repository"
import type { Skin, SkinFilters } from "@/domain/interfaces/skin"
import SkinCard from "./skin-card"

interface SkinsGridProps {
  filters: SkinFilters
}

export default function SkinsGrid({ filters }: SkinsGridProps) {
  const [skins, setSkins] = useState<Skin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSkins = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const filteredSkins = await SkinsRepository.getFilteredSkins(filters)
        setSkins(filteredSkins)
      } catch (error) {
        console.error("Failed to load skins:", error)
        setError("Failed to load skins. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadSkins()
  }, [filters])

  if (error) {
    return (
      <div id="skins-grid-error" className="text-center py-20">
        <div className="text-red-400 text-xl mb-4">⚠️ {error}</div>
        <button onClick={() => window.location.reload()} className="text-red-400 hover:text-red-300 underline">
          Try Again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div id="skins-grid-loading" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4 animate-pulse">
            <div className="bg-gray-800 aspect-[4/3] rounded-lg mb-4"></div>
            <div className="bg-gray-800 h-4 rounded mb-2"></div>
            <div className="bg-gray-800 h-4 rounded w-2/3 mb-2"></div>
            <div className="bg-gray-800 h-6 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (skins.length === 0) {
    return (
      <div id="skins-grid-empty" className="text-center py-20">
        <div className="text-gray-400 text-xl mb-4">No skins found</div>
        <p className="text-gray-500">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div id="skins-grid">
      <div className="mb-4 text-gray-400">
        Showing {skins.length} skin{skins.length !== 1 ? "s" : ""}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skins.map((skin) => (
          <SkinCard key={skin.id} skin={skin} />
        ))}
      </div>
    </div>
  )
}
