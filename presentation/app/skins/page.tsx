"use client"

import { useState } from "react"
import Header from "@/presentation/layout/header"
import Footer from "@/presentation/layout/footer"
import SkinsGrid from "./_components/skins-grid"
import SkinsFilters from "./_components/skins-filters"
import type { SkinFilters } from "@/domain/interfaces/skin"

const SkinsPage = () => {
  const [filters, setFilters] = useState<SkinFilters>({})

  const handleFiltersChange = (newFilters: SkinFilters) => {
    setFilters(newFilters)
  }

  return (
    <div id="skins-page" className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Premium Skins Collection</h1>
          <p className="text-gray-400 text-lg">Discover exclusive Valorant weapon skins from the official API</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SkinsFilters onFiltersChange={handleFiltersChange} />
          </div>
          <div className="lg:col-span-3">
            <SkinsGrid filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SkinsPage
