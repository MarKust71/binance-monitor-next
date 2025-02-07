import { create } from 'zustand'
import { DbTradesState } from './db.trades.store.types'

export const useDbTradesStore = create<DbTradesState>((set) => ({
  trades: [],

  setTrades: (trades) => set(() => ({ trades })),
}))
