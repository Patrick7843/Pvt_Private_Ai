import { create } from 'zustand';

interface Model {
  id: string;
  name: string;
  type?: 'chat' | 'image';
}

interface ModelStore {
  models: Model[];
  selectedModel: Model | null;
  isModelListVisible: boolean;
  setModels: (models: Model[]) => void;
  setSelectedModel: (model: Model) => void;
  toggleModelList: () => void;
  hideModelList: () => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  selectedModel: null,
  isModelListVisible: false,
  setModels: (models) => set({ models }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  toggleModelList: () => set((state) => ({ isModelListVisible: !state.isModelListVisible })),
  hideModelList: () => set({ isModelListVisible: false }),
}));

// Helper function to check if current model is FLUX
export const isFluxModel = (model: Model | null) => {
  return model?.id === 'FLUX.1-dev';
};