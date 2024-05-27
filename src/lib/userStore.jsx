import { create } from 'zustand'

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading:true,
  fetchUserInfo:async (uid) =>{
    if(!uid) return set({currentUser:null})
  }
}))
