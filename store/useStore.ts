import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  imageUrl: string | null;
  imageFile: File | null;
  isUploading: boolean;
  setImageUrl: (image: string | null) => void;
  setImageFile: (file: File | null) => void;
  model: string | null;
  setModel: (model: string | null) => void;
  userPrompt: string | null;
  setUserPrompt: (prompt: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      imageUrl: null,
      imageFile: null,
      isUploading: false,
      model: null,
      userPrompt: null,
      setImageUrl: (image: string | null) => set({ imageUrl: image }),
      setImageFile: (file: File | null) => set({ imageFile: file }),
      setModel: (model: string | null) => set({ model }),
      setUserPrompt: (prompt: string | null) => set({ userPrompt: prompt }),
      setIsUploading: (isUploading: boolean) => set({ isUploading }),
    }),
    {
      name: "image-storage",
      partialize: (state) => ({ imageUrl: state.imageUrl }),
    }
  )
);

export default useStore;
