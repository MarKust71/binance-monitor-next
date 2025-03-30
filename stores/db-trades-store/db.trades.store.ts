import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DbTradesState } from './db.trades.store.types'

export const OFFSET = 0
export const LIMIT = 10

export const useDbTradesStore = create<DbTradesState>()(
  persist(
    (set) => ({
      trades: [],
      pagination: {
        offset: OFFSET,
        limit: LIMIT,
        total: 0,
        has_next: false,
      },
      isFetching: false,
      queryParams: {
        excludeStatuses: [],
      },

      setTrades: (trades) => set(() => ({ trades })),

      setPagination: (pagination) => set(() => ({ pagination })),

      setIsFetching: (isFetching) => set(() => ({ isFetching })),

      setQueryParams: (queryParams) => set(() => ({ queryParams })),
    }),
    {
      name: 'db-trades-storage', // unique name
    }
  )
)
