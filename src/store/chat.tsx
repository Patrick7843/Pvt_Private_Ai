import { create } from "zustand";
import { chatState } from "../types/types";

type chatStoreState = {
  chats: chatState[];
  streamingText: string;
  addChat: (newChat: chatState) => void;
  setChat: (newChat: chatState[]) => void;
  clearChats: () => void;
  setStreamingText: (text: string) => void;
};

export const useChat = create<chatStoreState>((set) => ({
  chats: [],
  streamingText: "",
  addChat: (newChat) =>
    set((state) => ({
      chats: [...state.chats, newChat],
    })),
  setChat: (newChat) => set({ chats: newChat }),
  clearChats: () => set({ chats: [] }),
  setStreamingText: (text) => set({ streamingText: text }),
}));
