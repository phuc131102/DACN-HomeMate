import { create } from "zustand";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isLoading: true,
  ChangeChat: async (chatId, user) => {
    return set({
      chatId,
      user,
      isLoading: true,
    });
  },
}));
