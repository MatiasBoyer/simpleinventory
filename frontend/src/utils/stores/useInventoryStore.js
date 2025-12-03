import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useInventoryStore = create(
  persist(
    (set, get) => ({
      /*
      {
        id: string,
        label: string,
        qty: number
      }
      */
      items: [],
      addItem: (label, startQty = 0) => {
        let id = 0;
        try {
          id = crypto.randomUUID();
        } catch {
          id =
            Date.now().toString(36) +
            Math.random().toString(36).substring(2, 9);
        }

        const newItem = {
          id,

          label,
          qty: startQty,
        };
        set({ items: [...get().items, newItem] });
      },
      removeItem: (itemId) => {
        set({
          items: get().items.filter((f) => f.id !== itemId),
        });
      },
      sumItem: (itemId, sumQty) =>
        set({
          items: get().items.map((f) => {
            if (f.id === itemId) {
              f.qty += sumQty;
            }

            if (f.qty < 0) {
              f.qty = 0;
            }

            return f;
          }),
        }),
      setItemQty: (itemId, newQty) => {
        set({
          items: get().items.map((f) => {
            if (f.id === itemId) {
              f.qty = newQty;
            }

            return f;
          }),
        });
      },
    }),
    {
      name: 'shared-inv',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
