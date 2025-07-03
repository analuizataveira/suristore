"use client"

import { useState, useEffect } from "react"
import { Card } from "@/presentation/components/internal/card"
import { Button } from "@/presentation/components/internal/button"
import { SkinRarity, type SkinFilters } from "@/domain/interfaces/skin"
import { SkinsRepository } from "@/data/repositories/skins-repository"

interface SkinsFiltersProps {
  onFiltersChange: (filters: SkinFilters) => void
}

export default function SkinsFilters({ onFiltersChange }: SkinsFiltersProps) {
  const [selectedWeapon, setSelectedWeapon] = useState<string>("")
  const [selectedRarity, setSelectedRarity] = useState<SkinRarity | "">("")
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 5000 })
  const [availableWeapons, setAvailableWeapons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const rarities = Object.values(SkinRarity)

  useEffect(() => {
    const loadWeapons = async () => {
      try {
        const weapons = await SkinsRepository.getUniqueWeapons()
        setAvailableWeapons(weapons)
      } catch (error) {
        console.error("Failed to load weapons:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWeapons()
  }, [])

  useEffect(() => {
    const filters: SkinFilters = {
      weapon: selectedWeapon || undefined,
      rarity: selectedRarity || undefined,
      priceRange: priceRange.max < 5000 ? priceRange : undefined,
    }

    onFiltersChange(filters)
  }, [selectedWeapon, selectedRarity, priceRange, onFiltersChange])

  const handleClearFilters = () => {
    setSelectedWeapon("")
    setSelectedRarity("")
    setPriceRange({ min: 0, max: 5000 })
  }

  const getRarityDisplayName = (rarity: string) => {
    const names = {
      select: "Select Edition",
      deluxe: "Deluxe Edition",
      premium: "Premium Edition",
      ultra: "Ultra Edition",
      exclusive: "Exclusive Edition",
    }
    return names[rarity as keyof typeof names] || rarity
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

  if (isLoading) {
    return (
      <Card id="skins-filters-loading" className="sticky top-24">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card id="skins-filters" className="sticky top-24">
      <h3 className="text-xl font-semibold text-white mb-4">Filters</h3>

      {/* Weapon Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Weapon</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          <label className="flex items-center">
            <input
              type="radio"
              name="weapon"
              value=""
              checked={selectedWeapon === ""}
              onChange={(e) => setSelectedWeapon(e.target.value)}
              className="mr-2 text-red-600 focus:ring-red-500"
            />
            <span className="text-gray-300">All Weapons</span>
          </label>
          {availableWeapons.map((weapon) => (
            <label key={weapon} className="flex items-center">
              <input
                type="radio"
                name="weapon"
                value={weapon}
                checked={selectedWeapon === weapon}
                onChange={(e) => setSelectedWeapon(e.target.value)}
                className="mr-2 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-300">{weapon}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rarity Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Rarity</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="rarity"
              value=""
              checked={selectedRarity === ""}
              onChange={(e) => setSelectedRarity(e.target.value as SkinRarity)}
              className="mr-2 text-red-600 focus:ring-red-500"
            />
            <span className="text-gray-300">All Rarities</span>
          </label>
          {rarities.map((rarity) => (
            <label key={rarity} className="flex items-center">
              <input
                type="radio"
                name="rarity"
                value={rarity}
                checked={selectedRarity === rarity}
                onChange={(e) => setSelectedRarity(e.target.value as SkinRarity)}
                className="mr-2 text-red-600 focus:ring-red-500"
              />
              <span className={`${getRarityColor(rarity)} font-medium`}>{getRarityDisplayName(rarity)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Max Price</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="875"
            max="4350"
            step="100"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) })}
            className="w-full accent-red-600"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>875 VP</span>
            <span className="text-red-400 font-medium">{priceRange.max.toLocaleString()} VP</span>
          </div>
        </div>
      </div>

      <Button variant="secondary" size="sm" onClick={handleClearFilters} className="w-full">
        Clear All Filters
      </Button>
    </Card>
  )
}
