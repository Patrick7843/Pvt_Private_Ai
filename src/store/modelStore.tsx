import { create } from "zustand";

interface Model {
  id: string;
  name: string;
}

interface ModelState {
  models: Model[];
  selectedModel: Model | null;
  isModelListVisible: boolean;
  setModels: (models: Model[]) => void;
  setSelectedModel: (model: Model) => void;
  toggleModelList: () => void;
  hideModelList: () => void;
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],
  selectedModel: null,
  isModelListVisible: false,
  setModels: (models) => set({ models }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  toggleModelList: () => set((state) => ({ isModelListVisible: !state.isModelListVisible })),
  hideModelList: () => set({ isModelListVisible: false }),
})); 