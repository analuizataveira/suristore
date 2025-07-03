import type { ValorantWeapon } from "@/domain/interfaces/weapon"
import type { ContentTier } from "@/domain/interfaces/content-tier"

export class ValorantApiRepository {
  private static readonly BASE_URL = "https://valorant-api.com/v1"

  static async getAllWeapons(): Promise<ValorantWeapon[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/weapons`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Failed to fetch weapons from Valorant API:", error)
      throw error
    }
  }

  static async getWeaponById(uuid: string): Promise<ValorantWeapon | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/weapons/${uuid}`)

      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || null
    } catch (error) {
      console.error(`Failed to fetch weapon ${uuid} from Valorant API:`, error)
      throw error
    }
  }

  static async getAllContentTiers(): Promise<ContentTier[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/contenttiers`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Failed to fetch content tiers from Valorant API:", error)
      throw error
    }
  }
}
