export interface Skin {
  id: string
  name: string
  weapon: string
  rarity: SkinRarity
  price: number
  image: string
  collection: string
  isPopular?: boolean
}

export enum SkinRarity {
  SELECT = "select",
  DELUXE = "deluxe",
  PREMIUM = "premium",
  ULTRA = "ultra",
  EXCLUSIVE = "exclusive",
}

export interface SkinFilters {
  weapon?: string
  rarity?: SkinRarity
  priceRange?: {
    min: number
    max: number
  }
  collection?: string
}
