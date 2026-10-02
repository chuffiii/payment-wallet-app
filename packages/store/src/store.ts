import { create } from "zustand"

type Store = {
    balance : number
}

export const useStore = create<Store>((set)=>({
    balance : 0 
}))