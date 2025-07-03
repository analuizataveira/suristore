import type { Skin } from "./skin" // Assuming Skin is defined in a separate file

export interface CartItem {
  skinId: string
  quantity: number
  skin: Skin
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}
