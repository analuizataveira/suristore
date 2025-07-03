import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Cart, CartItem } from "@/domain/interfaces/cart"
import type { Skin } from "@/domain/interfaces/skin"

interface CartStore extends Cart {
  addItem: (skin: Skin) => void
  removeItem: (skinId: string) => void
  updateQuantity: (skinId: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (skin: Skin) => {
        const { items } = get()
        const existingItem = items.find((item) => item.skinId === skin.id)

        if (existingItem) {
          get().updateQuantity(skin.id, existingItem.quantity + 1)
        } else {
          const newItem: CartItem = {
            skinId: skin.id,
            quantity: 1,
            skin,
          }
          set((state) => ({
            items: [...state.items, newItem],
          }))
          get().calculateTotal()
        }
      },

      removeItem: (skinId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.skinId !== skinId),
        }))
        get().calculateTotal()
      },

      updateQuantity: (skinId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(skinId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.skinId === skinId ? { ...item, quantity } : item)),
        }))
        get().calculateTotal()
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 })
      },

      calculateTotal: () => {
        const { items } = get()
        const total = items.reduce((sum, item) => sum + item.skin.price * item.quantity, 0)
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        set({ total, itemCount })
      },
    }),
    {
      name: "valorant-cart-storage",
    },
  ),
)
