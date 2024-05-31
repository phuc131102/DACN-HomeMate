import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      mainUser: null,
      chatId: null,
      user: null,
      isLoading: true,
      ChangeChat: async (chatId, user) => {
        // console.log("chane chat")
        return set({
          chatId,
          user,
          isLoading: true,
        });
      },
      ChangeCall: async (user) => {
        console.log(user)
        return set({
          mainUser:user,
          isLoading: true,
        });
      },
    }),
    {
      name: "chat-store", // unique name for the storage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);
