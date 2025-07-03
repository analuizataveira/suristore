import type { ValorantWeapon, ValorantSkin } from "@/domain/interfaces/weapon"
import type { ContentTier } from "@/domain/interfaces/content-tier"
import type { Skin, SkinRarity } from "@/domain/interfaces/skin"

export class ValorantDataMapper {
  private static contentTiers: ContentTier[] = []

  static setContentTiers(tiers: ContentTier[]) {
    this.contentTiers = tiers
  }

  static mapRarityFromContentTier(contentTierUuid: string | null): SkinRarity {
    if (!contentTierUuid) return "select" as SkinRarity

    const tier = this.contentTiers.find((t) => t.uuid === contentTierUuid)
    if (!tier) return "select" as SkinRarity

    // Map based on tier rank (lower rank = higher rarity)
    switch (tier.rank) {
      case 0:
        return "exclusive" as SkinRarity
      case 1:
        return "ultra" as SkinRarity
      case 2:
        return "premium" as SkinRarity
      case 3:
        return "deluxe" as SkinRarity
      default:
        return "select" as SkinRarity
    }
  }

  static mapPriceFromContentTier(contentTierUuid: string | null): number {
    if (!contentTierUuid) return 875

    const tier = this.contentTiers.find((t) => t.uuid === contentTierUuid)
    if (!tier) return 875

    // Map prices based on tier rank
    switch (tier.rank) {
      case 0:
        return 4350 // Exclusive
      case 1:
        return 2175 // Ultra
      case 2:
        return 1775 // Premium
      case 3:
        return 1275 // Deluxe
      default:
        return 875 // Select
    }
  }

  static mapValorantSkinToSkin(valorantSkin: ValorantSkin, weapon: ValorantWeapon): Skin {
    const rarity = this.mapRarityFromContentTier(valorantSkin.contentTierUuid)
    const price = this.mapPriceFromContentTier(valorantSkin.contentTierUuid)

    // Get the best available image
    const image =
      valorantSkin.chromas?.[0]?.fullRender ||
      valorantSkin.displayIcon ||
      weapon.displayIcon ||
      "/placeholder.svg?height=300&width=400"

    return {
      id: valorantSkin.uuid,
      name: valorantSkin.displayName,
      weapon: weapon.displayName,
      rarity,
      price,
      image,
      collection: this.extractCollectionName(valorantSkin.displayName),
      isPopular: this.isPopularSkin(valorantSkin.displayName, weapon.displayName),
    }
  }

  private static extractCollectionName(skinName: string): string {
    // Extract collection name from skin name
    // Example: "Vandal Prime" -> "Prime"
    const parts = skinName.split(" ")
    return parts.length > 1 ? parts.slice(1).join(" ") : "Standard"
  }

  private static isPopularSkin(skinName: string, weaponName: string): boolean {
    const popularSkins = [
      "prime",
      "elderflame",
      "reaver",
      "ion",
      "singularity",
      "phantom",
      "dragon",
      "oni",
      "glitchpop",
      "spectrum",
    ]

    const skinLower = skinName.toLowerCase()
    const weaponLower = weaponName.toLowerCase()

    return popularSkins.some(
      (popular) => skinLower.includes(popular) || weaponLower.includes("phantom") || weaponLower.includes("vandal"),
    )
  }

  static filterValidSkins(weapon: ValorantWeapon): ValorantSkin[] {
    return weapon.skins.filter((skin) => {
      // Filter out default skins and skins without proper names
      return (
        skin.uuid !== weapon.defaultSkinUuid &&
        skin.displayName !== weapon.displayName &&
        !skin.displayName.includes("Standard") &&
        !skin.displayName.includes("Random Favorite")
      )
    })
  }
}
