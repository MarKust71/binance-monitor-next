import { create } from 'zustand'
import { DbTradesState } from './db.trades.store.types'

export const OFFSET = 0
export const LIMIT = 10

export const useDbTradesStore = create<DbTradesState>((set) => ({
  trades: [],
  pagination: {
    offset: OFFSET,
    limit: LIMIT,
    total: 0,
    has_next: false,
  },
  isFetching: false,

  setTrades: (trades) => set(() => ({ trades })),

  setPagination: (pagination) => set(() => ({ pagination })),

  setIsFetching: (isFetching) => set(() => ({ isFetching })),
}))
