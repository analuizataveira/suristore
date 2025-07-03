import type { Skin, SkinFilters } from "@/domain/interfaces/skin"
import { ValorantApiRepository } from "./valorant-api-repository"
import { ValorantDataMapper } from "@/utils/valorant-data-mapper"

export class SkinsRepository {
  private static skinsCache: Skin[] = []
  private static lastFetchTime = 0
  private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static async getAllSkins(): Promise<Skin[]> {
    const now = Date.now()

    // Return cached data if still valid
    if (this.skinsCache.length > 0 && now - this.lastFetchTime < this.CACHE_DURATION) {
      return this.skinsCache
    }

    try {
      // Fetch content tiers first for rarity mapping
      const contentTiers = await ValorantApiRepository.getAllContentTiers()
      ValorantDataMapper.setContentTiers(contentTiers)

      // Fetch all weapons
      const weapons = await ValorantApiRepository.getAllWeapons()

      // Extract and map all skins
      const allSkins: Skin[] = []

      for (const weapon of weapons) {
        const validSkins = ValorantDataMapper.filterValidSkins(weapon)

        for (const valorantSkin of validSkins) {
          const mappedSkin = ValorantDataMapper.mapValorantSkinToSkin(valorantSkin, weapon)
          allSkins.push(mappedSkin)
        }
      }

      // Cache the results
      this.skinsCache = allSkins
      this.lastFetchTime = now

      return allSkins
    } catch (error) {
      console.error("Failed to fetch skins from Valorant API:", error)

      // Return cached data if available, otherwise return empty array
      return this.skinsCache.length > 0 ? this.skinsCache : []
    }
  }

  static async getSkinById(id: string): Promise<Skin | null> {
    const allSkins = await this.getAllSkins()
    return allSkins.find((skin) => skin.id === id) || null
  }

  static async getPopularSkins(): Promise<Skin[]> {
    const allSkins = await this.getAllSkins()
    return allSkins.filter((skin) => skin.isPopular).slice(0, 6) // Limit to 6 popular skins
  }

  static async getFilteredSkins(filters: SkinFilters): Promise<Skin[]> {
    const allSkins = await this.getAllSkins()
    let filtered = [...allSkins]

    if (filters.weapon) {
      filtered = filtered.filter((skin) => skin.weapon.toLowerCase().includes(filters.weapon!.toLowerCase()))
    }

    if (filters.rarity) {
      filtered = filtered.filter((skin) => skin.rarity === filters.rarity)
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (skin) => skin.price >= filters.priceRange!.min && skin.price <= filters.priceRange!.max,
      )
    }

    if (filters.collection) {
      filtered = filtered.filter((skin) => skin.collection.toLowerCase().includes(filters.collection!.toLowerCase()))
    }

    return filtered
  }

  static async getUniqueWeapons(): Promise<string[]> {
    const allSkins = await this.getAllSkins()
    const weapons = [...new Set(allSkins.map((skin) => skin.weapon))]
    return weapons.sort()
  }

  static async getUniqueCollections(): Promise<string[]> {
    const allSkins = await this.getAllSkins()
    const collections = [...new Set(allSkins.map((skin) => skin.collection))]
    return collections.sort()
  }
}
