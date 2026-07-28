import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Getters / Computed Helpers
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart or increment quantity if it already exists
      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === newItem.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: newItem.quantity || 1 }],
          });
        }
      },

      // Remove item completely by ID
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      // Update quantity directly (removes item if quantity <= 0)
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      // Clear all items from cart
      clearCart: () => {
        set({ items: [] });
      },

      // Computed helper: Total count of items
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Computed helper: Total price of all items
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'arada-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
