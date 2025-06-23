import { RECORD } from "@/app/code/[uid]/page";
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
  codeResponse: string;
  setCodeResponse: (code: string | ((prev: string) => string)) => void;
  record: RECORD | null;
  setRecord: (record: RECORD | null) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      imageUrl: null,
      imageFile: null,
      isUploading: false,
      model: null,
      userPrompt: null,
      codeResponse: "",
      record: null,
      setImageUrl: (image: string | null) => set({ imageUrl: image }),
      setImageFile: (file: File | null) => set({ imageFile: file }),
      setModel: (model: string | null) => set({ model }),
      setUserPrompt: (prompt: string | null) => set({ userPrompt: prompt }),
      setIsUploading: (isUploading: boolean) => set({ isUploading }),
      setCodeResponse: (code: string | ((prev: string) => string)) =>
        set((state) => ({
          codeResponse:
            typeof code === "function" ? code(state.codeResponse) : code,
        })),
      setRecord: (record: any) => set({ record }),
    }),
    {
      name: "image-storage",
      partialize: (state) => ({ imageUrl: state.imageUrl }),
    }
  )
);

export default useStore;
