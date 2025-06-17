import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  imageUrl: string | null;
  setImageUrl: (image: string | null) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      imageUrl: null,
      setImageUrl: (image: string | null) => set({ imageUrl: image }),
    }),
    {
      name: "image-storage",
    }
  )
);

export default useStore;
